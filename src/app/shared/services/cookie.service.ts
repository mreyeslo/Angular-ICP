import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: "root",
})
export class DappCookieService {
    defaultApplicationCache = { viewLaunchOverlay: true };
    applicationCache: any = this.defaultApplicationCache;
    constructor(private _cookieService: CookieService) {
        this.initializeApplicationCookies();
    }

    initializeApplicationCookies() {
        const appCache = this.getCookie("applicationCache");
        this.applicationCache = appCache ? JSON.parse(appCache) : this.defaultApplicationCache;
    }

    setApplicationCookies(key: string, value: any) {
        this.applicationCache[key] = value;
        this.setCookie("applicationCache", this.applicationCache);
    }

    getCookie(key: string) {
        return this._cookieService.get(key);
    }
    setCookie(key: string, value: any) {
        return this._cookieService.set(key, JSON.stringify(value));
    }
}
