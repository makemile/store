import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContextToken,
    HttpContext,
} from "@angular/common/http";
import { exhaustMap, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { tokenService } from "./token.service";
import { AuthService } from "./auth-services.module";

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
    return new HttpContext().set(CHECK_TOKEN, true);
}
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private token: tokenService,
        private authService: AuthService
    ) {}

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (req.context.get(CHECK_TOKEN)) {
            return this.updateAccessTokenRefresh(req, next);
        }
        return next.handle(req);
    }

    private addToken(req: HttpRequest<unknown>, next: HttpHandler) {
        const accesToken = this.token.getToken();
        if (accesToken) {
            const auth = req.clone({
                headers: req.headers.set(
                    "Authorization",
                    `Bearer ${accesToken}`
                ),
            });
            return next.handle(auth);
        }
        return next.handle(req);
    }

    private updateAccessTokenRefresh(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ) {
        const accessRefreshToken = this.token.getRefreshToken();
        const isValidRefreshToken = this.token.isValidRefreshToken();
        if (accessRefreshToken && isValidRefreshToken) {
            return this.authService
                .refreshToken(accessRefreshToken)
                .pipe(exhaustMap(() => this.addToken(req, next)));
        }
        return next.handle(req);
    }
}
