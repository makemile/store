import { Injectable } from "@angular/core";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
    providedIn: "root",
})
export class tokenService {
    constructor() {}

    saveToken(token: string) {

        if (typeof document !== "undefined") {
            setCookie("access_token", token, { expires: 365, path: "" });
        }
    }

    getToken() {
        if (typeof document !== "undefined") {
            const token = getCookie("access_token");
            return token;
        }
        return null;
    }

    removeToken() {
        removeCookie("access_token");
    }

    saveRefreshToken(token: string) {
        if (typeof document !== "undefined") {
            setCookie("refresh_token", token, { expires: 365, path: "/" });
        }
    }

    getRefreshToken() {
        if (typeof document !== "undefined") {
            const token = getCookie("refresh_token");
            return token;
        }
        return null;
    }

    removeRefreshToken() {
        removeCookie("refresh_token");
    }

    isValidRefreshToken(): string | boolean {
        const token = this.getRefreshToken();
        if (!token) {
            return false;
        }
        const decodetoken = jwtDecode<JwtPayload>(token);
        if (decodetoken && decodetoken?.exp) {
            const tokenDate = new Date(0);
            tokenDate.setUTCSeconds(decodetoken.exp);
            const today = new Date();
            return tokenDate.getTime() > today.getTime();
        }
        return false;
    }

    isValidToken():boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const decodetoken = jwtDecode<JwtPayload>(token);
        if (decodetoken && decodetoken?.exp) {
            const tokenDate = new Date(0);
            tokenDate.setUTCSeconds(decodetoken.exp);
            const today = new Date();
            return tokenDate.getTime() > today.getTime();
        }

        return false;
    }
}
