import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../modules/auth/storageToken.service";
import { AuthService } from "../modules/auth/auth-services.module";
import { combineLatest, filter, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        const isAuthenticated$ = this.authService.isAuthenticated$;
        const isLoading$ = this.authService.isLoading$;
        combineLatest([isAuthenticated$, isLoading$])
            .pipe(
                filter(
                    ([isAuthenticated, isLoading]: [boolean, boolean]) =>
                        !isLoading && isAuthenticated
                )
            )
            .subscribe(([isAuthenticated]) => {
                isAuthenticated;
            });
    }
}
