import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './modules/auth/auth-services.module';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: `
    <div *ngIf="isLoading">Cargando...</div>
    <router-outlet></router-outlet>
  `,
  standalone: true,
})
export class AppComponent {
  title = 'store';
  isLoading = true;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.updateAuthStatus();
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/auth/login']);
      }
      this.isLoading = false;
    });
  }
}
