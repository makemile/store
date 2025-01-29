import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import path from "path";

@Injectable({
    providedIn: "root",
})
export class StorageService {
    private isLocalStorageAvailable: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: object | string) {
        this.isLocalStorageAvailable = isPlatformBrowser(this.platformId);
    }

    getItem(): string | null {
        if (this.isLocalStorageAvailable) {
            return localStorage.getItem("access_token");
        }
        return null;
    }

    setItem(value: string): void {
        if (this.isLocalStorageAvailable) {
            console.log(this.isLocalStorageAvailable);
            localStorage.setItem("access_token", value);
        }
    }

    removeItem(key: string): void {
        if (this.isLocalStorageAvailable) {
            localStorage.removeItem(key);
        }
    }
    getAccessToken(): string | null {
        if (this.isLocalStorageAvailable) {
            return localStorage.getItem("access_token");
        }
        return null;
    }

    setAccessToken(token: string): void {
        if (this.isLocalStorageAvailable) {
            localStorage.setItem("access_token", token);
        }
    }

    getRefreshToken(): string | null {
        if (this.isLocalStorageAvailable) {
            return localStorage.getItem("refresh_token");
        }
        return null;
    }

    setRefreshToken(token: string): void {
        if (this.isLocalStorageAvailable) {
            localStorage.setItem("refresh_token", token);
        }
    }
    clear(): void {
        this.removeItem("access_token");
        this.removeItem("refresh_token");
    }
}
