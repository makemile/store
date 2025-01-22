import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {
  loginResponse,
  user,
  userLogin,
} from 'src/app/shared/model/user.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesModule {
  constructor(private http: HttpClient, private router: Router, private localStorage: StorageService) {}

  createUser(userData: user) {
    const url = 'https://api.escuelajs.co/api/v1/users/';
    return this.http.post<user>(url, userData);
  }

  loginUser(userData: userLogin):Observable<loginResponse> {
    const url = 'https://api.escuelajs.co/api/v1/auth/login';
    return this.http.post<loginResponse>(url, userData).pipe(
      tap((resp) => {
       this.localStorage.setItem('access_token', resp.access_token);
       this.localStorage.setItem('refresh_token', resp.refresh_token);
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
