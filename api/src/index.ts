import {
    blob,
    Canister,
    nat,
    nat32,
    Opt,
    Principal,
    query,
    Record,
    StableBTreeMap,
    text,
    Tuple,
    update,
    Vec,
    Void,
    ic,
    bool,
    nat64,
    None
} from 'azle';
import { v4 } from 'uuid';


const Organization = Record({
    id: text,
    organizationName: text,
    createdDate: text
});
type Organization = typeof Organization.tsType;

let organizationMap = StableBTreeMap<string, string>(0);

const User = Record({
    id: text,
    username: text,
    principalId: text,
    principal: Principal,
    createdDate: text
});

type User = typeof User.tsType;
let userMap = StableBTreeMap<string, string>(1);

const Admin = Record({
    createdDate: text
});

type Admin = typeof Admin.tsType;
let adminMap = StableBTreeMap<string, string>(2);

const Activity = Record({
    id: text,
    activityType: text,
    activityMessage: text,
    createdDate: text
});
type Activity = typeof Activity.tsType;
let activityMap = StableBTreeMap<string, string>(3);

let orgUsers = StableBTreeMap<string, string>(4);

export default Canister({

    // getAllOrganizationUsers: update([text], text, () => {
    //     const adminUser = adminMap.items();
    //     return JSON.stringify({ adminUser });
    // }),

    // getOrganizationUsers: update([text], text, (organizationId) => {
    //     const principalId = ic.caller().toString();
    //     const adminPrimaryKey = organizationId + ":" + principalId;
    //     const admin = adminMap.get(adminPrimaryKey).Some;
    //     const adminUser = JSON.parse(admin ? admin : "");
    //     return JSON.stringify({ adminUser, adminPrimaryKey });
    // }),

    // deleteAllUsers: update([], Vec(text), () => {
    //     userMap.keys().forEach(key => {
    //         userMap.remove(key);

    //     })
    //     return userMap.keys();
    // }),

    // deleteAllOrgs: update([], Vec(text), () => {
    //     organizationMap.keys().forEach(key => {
    //         organizationMap.remove(key);
    //     })
    //     return organizationMap.keys();
    // }),

    logLogin: update([text], text, (username) => {
        const principalId = ic.caller().toString();
        userMap.insert(principalId, JSON.stringify({
            id: principalId,
            username: username,
            principal: ic.caller(),
            createdDate: Date.now().toString()
        }));
        const adminOrgs = adminMap.items().filter(item => item[0].split(":")[1] == principalId);
        const userOrgs = orgUsers.items().filter(item => item[0].split(":")[1] == principalId);
        const settings = {
            adminOrgs,
            userOrgs
        }
        return JSON.stringify(settings);
    }),

    logActivity: update([text, text], text, (activityType, activityMessage) => {
        const id = v4();

        activityMap.insert(id, JSON.stringify({
            id: id,
            activityType: activityType,
            activityMessage: activityMessage,
            createdDate: Date.now().toString()
        }));
        return id;
    }),

    insertOrganization: update([text], text, (organizationName) => {
        const principalId = ic.caller().toString();

        const id = v4();
        organizationMap.insert(id, JSON.stringify({
            id,
            organizationName: organizationName,
            createdDate: Date.now().toString()
        }));
        const orgAdminId = id + ":" + principalId;
        adminMap.insert(orgAdminId, JSON.stringify({
            createdDate: Date.now().toString()
        }));
        return id;
    }),

    insertOrganizationUser: update([text, text], text, (organizationId) => {
        const principalId = ic.caller().toString();
        const adminPrimaryKey = organizationId + ":" + principalId;
        const adminUser = adminMap.get(adminPrimaryKey).Some;
        const returnObject = { returnCode: 0, returnMessage: "" };
        if (adminUser) {
            const primaryKey = organizationId + ":" + principalId;
            orgUsers.insert(primaryKey, JSON.stringify({
                createdDate: Date.now().toString()
            }));
            returnObject.returnCode = 1;
            returnObject.returnMessage = "Organization User Added";
        }
        else {
            returnObject.returnCode = 0;
            returnObject.returnMessage = "Failure Adding Organization User";
        }
        return JSON.stringify(returnObject);

    }),


    getUsers: query([], Vec(text), () => {
        return userMap.values();
    }),
    getOrganizations: query([], Vec(text), () => {
        return organizationMap.keys();
    }),
    getOrganizationAdmins: query([text], Vec(Vec(text)), (organization) => {
        return adminMap.items().filter(item => item[0].split(":")[0] == organization);;
    }),

    // adminData: query([text,text], Opt(text), (principalId,organizationId) => {
    //     const orgAdminId = organizationId+":"+principalId;
    //     return adminMap.get(orgAdminId);
    // }),

    getAllActivity: query([], Vec(text), () => {
        return activityMap.values();
    }),

});

