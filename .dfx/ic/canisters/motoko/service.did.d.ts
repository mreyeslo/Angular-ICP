import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'addData' : ActorMethod<[string, string], undefined>,
  'getData' : ActorMethod<[], Array<[string, string]>>,
}
