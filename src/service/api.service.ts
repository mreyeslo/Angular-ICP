import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { idlFactory } from 'src/declarations/api';
import { _SERVICE } from 'src/declarations/api/api.did';

const actor = require('src/declarations/api').createActor;

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiActor: _SERVICE = actor(environment.API_CANISTER_ID, {
    agentOptions: {
      host: environment.API_CANISTER_HOST
    }
  });

  constructor() { }

  // public async add(data: any): Promise<any> {
  //   var date = Date.now().toString()
  //   return await this.apiActor.insertOrganization("wallet");
  // }

}
