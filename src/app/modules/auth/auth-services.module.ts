import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import {jwtDecode} from'jwt-decode'
import { loginResponse, user, userLogin } from "src/app/models/user.model";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { StorageService } from "./storageToken.service";
import { ToastService } from "./toast.service";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/app/core/constants/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    private isLoadingSubject = new BehaviorSubject<boolean>(true);
    isLoading$ = this.isLoadingSubject.asObservable();
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    constructor(
        private http: HttpClient,
        private router: Router,
        private localStorage: StorageService,
        private ToastServices: ToastService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {}

    initializeAuthState(): void {
        const isAuthenticated = this.isAuthenticated();
        this.isAuthenticatedSubject.next(isAuthenticated);
        this.isLoadingSubject.next(false);
    }

    createUser(userData: user) {
        const url = `${environment.API_URL}/users/`;
        this.ToastServices.show(
            "Has sido registrado exitosamente",
            "success",
            3000
        );
        return this.http.post<user>(url, userData);
    }

    loginUser(userData: userLogin): Observable<loginResponse> {
        const url = `${environment.API_URL}/auth/login/`;
        return this.http.post<loginResponse>(url, userData).pipe(
            tap((resp) => this.handleSuccesfulLogin(resp)),
            catchError((error) => this.handleLoginError(error))
        );
    }

    refreshToken() {
        const refreshToken = this.localStorage.getRefreshToken();
        const url = "https://api.escuelajs.co/api/v1/auth/refresh-token";
        return this.http.post<{ access_token: string }>(url, {
            refreshToken: refreshToken,
        }).pipe(
            tap((res) => {
                this.localStorage.setAccessToken(res.access_token)
            })
        )
    }

    private handleSuccesfulLogin(resp: loginResponse): void {
        this.localStorage.setItem(resp.access_token);
        this.localStorage.setItem(resp.refresh_token);
        this.ToastServices.show("Has iniciado sesión", "success", 3000);
        // this.isAuthenticatedSubject.next(true);
    }

    private handleLoginError(error: string): Observable<never> {
        this.ToastServices.show("Usario no registrado", "error", 3000);
        return throwError(() => error);
    }

    private isTokenValid(token: string): boolean {
        const helper = new JwtHelperService();
        console.log(helper.isTokenExpired(token));
        return !helper.isTokenExpired(token);
    }

    isValidRefreshToken(){
        const token = this.localStorage.getRefreshToken();
        if(!token){
            return false;
        }
        const decodeToken = jwtDecode(token);
        
        if(decodeToken && decodeToken?.exp){
          const tokenDate = new Date(0);
          tokenDate.setUTCSeconds(decodeToken.exp);
          const today = new Date();
          return tokenDate.getTime() > today.getTime();
        }
        return false;
    }

    public isAuthenticated(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const token = this.localStorage.getItem();
            console.log("token", token ? this.isTokenValid(token) : false);
            return token ? this.isTokenValid(token) : false;
        }
        console.log("false");
        return false;
    }

    logout(): void {
        this.localStorage.clear();
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(["/auth/login"]);
    }

    getProfile() {
        return this.http.get<user>(
            "https://api.escuelajs.co/api/v1/auth/profile",
            {
                headers: {
                    Authorization: `Bearer ${this.localStorage.getItem()}`,
                },
            }
        );
    }
}
