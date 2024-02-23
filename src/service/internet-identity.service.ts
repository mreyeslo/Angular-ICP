import { Injectable } from '@angular/core';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, ActorMethod, HttpAgent, Identity } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import { idlFactory } from 'src/declarations/api';
import { _SERVICE } from 'src/declarations/api/api.did';
import { MotokoService } from 'src/app/motoko.service';
import { environment } from 'src/environments/environment';

const webapp_id = process.env.WHOAMI_CANISTER_ID;
// The <canisterId>.localhost URL is used as opposed to setting the canister id as a parameter
// since the latter is brittle with regards to transitively loaded resources.
const local_ii_url = `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:8002`;


// @ts-ignore 
export const init = ({ IDL }) => {
    return [];
};


@Injectable()
export class InternetIdentityService {
    iiUrl = "";
    identity!: Identity;
    authClient!: AuthClient;
    constructor(private motokoService: MotokoService) {

    }

    async callInternetIdentity() {
        if (!environment.production) {
            this.iiUrl = local_ii_url;
        } else if (environment.production) {
            const id = environment.UI_CANISTER_ID
            this.iiUrl = `https://identity.ic0.app/#authorize`;
        } else {
            // fall back to local
            this.iiUrl = local_ii_url;
        }
        // When the user clicks, we start the login process.
        // First we have to create and AuthClient.
        this.authClient = await AuthClient.create();

        const isAuthenticated = await this.authClient.isAuthenticated();
        const MAX_TTL = 7 * 24 * 60 * 60 * 1000 * 1000 * 1000;

        if (!isAuthenticated) {
            await this.authClient?.login({
                identityProvider: this.iiUrl,
                onSuccess: async () => {
                    // At this point we're authenticated, and we can get the identity from the auth client:
                    this.motokoService.logLogin();
                    window.location.reload();
                },
                maxTimeToLive: <any>MAX_TTL,
            });
        }



    }
    async logOut() {
        this.authClient = await AuthClient.create();
        this.authClient.logout();
        window.location.reload();
    }

}