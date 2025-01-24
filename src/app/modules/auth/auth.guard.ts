import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(private localStorage: StorageService, private router: Router) {}

  canActivate(): boolean {
    setTimeout(() => {
      const token = this.localStorage.getItem('access_token');
      if (!token) {
        this.router.navigate(['/auth/login']);
      }
    }, 0);

    return true;
  }
}
