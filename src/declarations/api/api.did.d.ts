import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'deleteAllOrgs' : ActorMethod<[], Array<string>>,
  'deleteAllUsers' : ActorMethod<[], Array<string>>,
  'getAllActivity' : ActorMethod<[], Array<string>>,
  'getOrganizationAdmins' : ActorMethod<[string], Array<Array<string>>>,
  'getOrganizations' : ActorMethod<[], Array<string>>,
  'getUsers' : ActorMethod<[], Array<string>>,
  'insertOrganization' : ActorMethod<[string, string], string>,
  'insertOrganizationUser' : ActorMethod<[string, string], [] | [string]>,
  'isLoggedIn' : ActorMethod<[], boolean>,
  'logActivity' : ActorMethod<[string, string], string>,
  'logLogin' : ActorMethod<[string, string], string>,
}
