import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../modules/auth/storageToken.service";

@Injectable({
    providedIn: "root",
})
export class redirectAuthGuard {
    constructor(
        private router: Router,
        private tokenService: StorageService
    ) {}

    canActivate() {
        const token = this.tokenService.getItem('access_token');
        if (token) {
            this.router.navigate([""]);
        }
        return true;
    }
}
