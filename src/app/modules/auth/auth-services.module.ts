import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {
  loginResponse,
  user,
  userLogin,
} from 'src/app/shared/model/user.model';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})

export class AuthServicesModule {

  constructor(private http: HttpClient, private router: Router, private localStorage: StorageService,   private ToastServices : ToastService) {}

  createUser(userData: user) {
    const url = 'https://api.escuelajs.co/api/v1/users/';
    this.ToastServices.show('Has sido registrado exitosamente', 'success',3000);
    return this.http.post<user>(url, userData);
  }

  loginUser(userData: userLogin):Observable<loginResponse> {
    const url = 'https://api.escuelajs.co/api/v1/auth/login';
    return this.http.post<loginResponse>(url, userData).pipe(
      tap((resp) => {
       this.localStorage.setItem('access_token', resp.access_token);
       this.localStorage.setItem('refresh_token', resp.refresh_token);
       this.ToastServices.show('Has iniciado sesión', 'success',3000);
      }),
      catchError((error) => {
        this.ToastServices.show('Usario no registrado', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  public isAuthenticated():boolean {
    const token = this.localStorage.getItem('access_token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;

  }

  logout(){
    this.localStorage.removeItem('access_token');
    this.localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth/login']);
  }
}
