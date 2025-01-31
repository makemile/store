import { Injectable } from "@angular/core";
import { loginResponse, user, userLogin } from "src/app/models/user.model";
import { environment } from "src/app/core/constants/environment.prod";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastService } from "./toast.service";
import { BehaviorSubject, switchMap, tap } from "rxjs";
import { tokenService } from "./token.service";
import { checkToken } from "./jwt.interceptor";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    user$ = new BehaviorSubject<user | null>(null);
    constructor(
        private http: HttpClient,
        private toast: ToastService,
        private token: tokenService,
        private route: Router
    ) {}

    login(userData: userLogin) {
        return this.http
            .post<loginResponse>(`${environment.API_URL}/auth/login`, userData)
            .pipe(
                tap((resp) => {
                    this.token.saveToken(resp?.access_token),
                        this.token.saveRefreshToken(resp?.refresh_token)
                })
            );
    }

    register(userData: user) {
        return this.http.post<user>(
            `https://api.escuelajs.co/api/v1/users/`,
            userData
        );
    }

    registerAndLogin(userData: user) {
        return this.register(userData).pipe(
            switchMap(() => this.login(userData))
        );
    }

    refreshToken(refreshToken: string) {
        return this.http
            .post<loginResponse>(
                `https://api.escuelajs.co/api/v1/auth/refresh-token`,
                {
                    refreshToken,
                }
            )
            .pipe(
                tap((resp) => {
                    this.token.saveToken(resp?.access_token),
                        this.token.saveRefreshToken(resp?.refresh_token);
                })
            );
    }

    getUser() {
        return this.http
            .get<user>(`https://api.escuelajs.co/api/v1/auth/profile`, {
                context: checkToken(),
            })
            .pipe(
                tap((res) => {
                    this.user$.next(res);
                })
            );
    }

    logout(): void {
        this.token.removeToken();
        this.token.removeRefreshToken();
        this.route.navigate(["/auth/login"]);
    }
}
