// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  UI_CANISTER_ID: "yticf-nyaaa-aaaap-abv5q-cai",
  API_CANISTER_ID: process.env.API_CANISTER_ID,
  API_CANISTER_HOST: process.env.API_CANISTER_HOST,
  INTERNET_IDENTITY_CANISTER_ID: process.env.INTERNET_IDENTITY_CANISTER_ID
};
