import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tokenService } from "../modules/auth/token.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard {
    constructor(
        private router: Router,
        private token: tokenService
    ) {}

    canActivate() : boolean {
        const isValidToken = this.token.isValidRefreshToken();
        if (!isValidToken) {
            this.router.navigate(["/auth/login"]);
            return false;
        };
        return true;
    }
}
