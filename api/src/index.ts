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
    Void
} from 'azle';
import { v4 } from 'uuid';

const Organization = Record({
    id: text,
    username: text,
    internetIdentity: Principal
});
type Organization = typeof Organization.tsType;
let OrganizationMap = StableBTreeMap<string, Organization>(1);

export default Canister({
    insertOrganization: update([text, Principal], text, (numToInsert, principal) => {
        const id = v4();

        OrganizationMap.insert(id, {
            id,
            username: numToInsert,
            internetIdentity: principal
        });
        return id;
    }),

    getFromKey: query([text], Opt(Organization), (id) => {
        return OrganizationMap.get(id);
    }),

    clearOrganization: query([text], Vec(text), (id) => {
        var z =  OrganizationMap.remove(id);
        return OrganizationMap.keys(0);
    }),
    
    keysOrganization: query([nat32], Vec(text), (numToReturn) => {
        return OrganizationMap.keys(0, numToReturn);
    }),

    valuesOrganization: query([nat32], Vec(Organization), (numToReturn) => {
        return OrganizationMap.values(0, numToReturn);
    }),
    itemsOrganization: query(
        [nat32],
        Vec(Tuple(text, Organization)),
        (numToReturn) => {
            return OrganizationMap.items(0, numToReturn);
        }
    ),

});
