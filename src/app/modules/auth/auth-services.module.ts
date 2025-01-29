import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { loginResponse, user, userLogin } from "src/app/models/user.model";
import { RxJsDebug } from "src/app/models/debug.model";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { StorageService } from "./storageToken.service";
import { ToastService } from "./toast.service";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/app/core/constants/environment";
import { debug, setRxjsDebugLevel} from '../../shared/RXJS/debug.operator';

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(
        this.isAuthenticated()
    );
    private isLoadingSubject = new BehaviorSubject<boolean>(true);
    isLoading$ = this.isLoadingSubject.asObservable();
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    constructor(
        private http: HttpClient,
        private router: Router,
        private localStorage: StorageService,
        private ToastServices: ToastService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        setRxjsDebugLevel(RxJsDebug.DEBUG);
    }

    initializeAuthState(): void {
        const isAuthenticated = this.isAuthenticated();
        this.isAuthenticatedSubject.next(isAuthenticated);
        this.isLoadingSubject.next(false);
    }

    createUser(userData: user) {
        const url = `${environment.api.baseUrl}${environment.api.users.create}`;
        this.ToastServices.show(
            "Has sido registrado exitosamente",
            "success",
            3000
        );
        return this.http.post<user>(url, userData);
    }

    loginUser(userData: userLogin): Observable<loginResponse> {
        const url = `${environment.api.baseUrl}${environment.api.auth.login}`;
        debug(RxJsDebug.INFO, 'Mapped users')
        return this.http.post<loginResponse>(url, userData).pipe(
            tap((resp) => this.handleSuccesfulLogin(resp)),
            debug(RxJsDebug.DEBUG, 'Mapped users'),
            catchError((error) => this.handleLoginError(error)),
            
        );
    }

    private handleSuccesfulLogin(resp: loginResponse): void {
        this.localStorage.setItem("access_token", resp.access_token);
        this.localStorage.setItem("refresh_token", resp.refresh_token);
        this.ToastServices.show("Has iniciado sesión", "success", 3000);
        this.isAuthenticatedSubject.next(true);
    }

    private handleLoginError(error: string): Observable<never> {
        this.ToastServices.show("Usario no registrado", "error", 3000);
        return throwError(() => error);
    }

    private isTokenValid(token: string): boolean {
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(token);
    }

    public isAuthenticated(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const token = this.localStorage.getItem("access_token");
            return token ? this.isTokenValid(token) : false;
        }
        return false;
    }

    logout(): void {
        this.localStorage.removeItem("access_token");
        this.localStorage.removeItem("refresh_token");
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(["/auth/login"]);
    }
}
