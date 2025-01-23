import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private localStorage: StorageService, private router: Router) {}

  canActivate(): boolean {
    const token = this.localStorage.getItem('access_token');

    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
