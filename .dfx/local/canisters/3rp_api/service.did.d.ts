import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'clearOrganization' : ActorMethod<[string], Array<string>>,
  'getFromKey' : ActorMethod<
    [string],
    [] | [
      { 'id' : string, 'internetIdentity' : Principal, 'username' : string }
    ]
  >,
  'insertOrganization' : ActorMethod<[string, Principal], string>,
  'itemsOrganization' : ActorMethod<
    [number],
    Array<
      [
        string,
        { 'id' : string, 'internetIdentity' : Principal, 'username' : string },
      ]
    >
  >,
  'keysOrganization' : ActorMethod<[number], Array<string>>,
  'valuesOrganization' : ActorMethod<
    [number],
    Array<
      { 'id' : string, 'internetIdentity' : Principal, 'username' : string }
    >
  >,
}
