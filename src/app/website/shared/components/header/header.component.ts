import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { AuthService} from 'src/app/modules/auth/auth-services.module';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router:Router) {}
  hideSiteMenu = signal(true);
  hideHeader = signal(false);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  toogleSideMenu() {
    this.hideSiteMenu.update((prevState) => !prevState);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
