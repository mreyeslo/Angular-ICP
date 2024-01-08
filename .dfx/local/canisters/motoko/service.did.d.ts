import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Item { 'id' : string, 'content' : string }
export interface _SERVICE {
  'addItem' : ActorMethod<[Item], [] | [Item]>,
  'getAll' : ActorMethod<[], Array<string>>,
  'greet' : ActorMethod<[string], string>,
  'test' : ActorMethod<[], string>,
}
