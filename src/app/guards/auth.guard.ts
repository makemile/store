import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { StorageService } from '../modules/auth/storageToken.service';
import { AuthService } from '../modules/auth/auth-services.module';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(private localStorage: StorageService, private router: Router, private auth:AuthService) {}
  canActivate(
    
  ): boolean {
    setTimeout(() => {
      const token = this.localStorage.getItem('access_token');
      if (!token) {
        this.router.navigate(['/auth/login']);
      }
    }, 0);

    return true;
  }
}
