import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { idlFactory } from 'src/declarations/api';
import { _SERVICE } from 'src/declarations/api/api.did';
import { InternetIdentityService } from 'src/service/internet-identity.service';
import { HttpAgent, Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Router } from '@angular/router';

const actor = require('src/declarations/api').createActor;

@Injectable({
  providedIn: 'root'
})
export class MotokoService {



  constructor(private router :Router ) { }

  async createActor() {

  }
  public async addOrganization(organizationName: string): Promise<any> {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });

    const motokoActor: _SERVICE = actor(environment.API_CANISTER_ID, {
      agentOptions: {
        identity: authClient.getIdentity(),
        host: environment.API_CANISTER_HOST
      }
    });
    return await motokoActor.insertOrganization(organizationName,identity.getPrincipal().toString());
  }

  public async addOrganizationUser(organizationName: string, principalId: string): Promise<any> {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });

    const motokoActor: _SERVICE = actor(environment.API_CANISTER_ID, {
      agentOptions: {
        identity: authClient.getIdentity(),
        host: environment.API_CANISTER_HOST
      }
    });
    return await motokoActor.insertOrganizationUser(organizationName,principalId);
  }
  
  public async logLogin(): Promise<any> {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const principalId = identity.getPrincipal().toString();
    const motokoActor: _SERVICE = actor(environment.API_CANISTER_ID, {
      agentOptions: {
        identity: authClient.getIdentity(),
        host: environment.API_CANISTER_HOST 
      }
    }); 
    // await agent.fetchRootKey(); // this line is needed for the local env only

    const login =  await motokoActor.logLogin(principalId,principalId);
    return true;
  }

  public async logActivity(): Promise<any> {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const principalId = identity.getPrincipal().toString();
    const motokoActor: _SERVICE = actor(environment.API_CANISTER_ID, {
      agentOptions: {
        identity: authClient.getIdentity(),
        host: environment.API_CANISTER_HOST 
      }
    }); 
    // await agent.fetchRootKey(); // this line is needed for the local env only

    const login =  await motokoActor.logLogin(principalId,principalId);
    return true;
  }
}
