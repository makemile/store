import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../../website/services/cart.service';
import { RouterLinkWithHref, RouterLinkActive, Router } from '@angular/router';
import { AuthService} from 'src/app/modules/auth/auth-services.module';
import { user } from 'src/app/models/user.model';

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
  user: user | null = null;

  ngOnInit(){
    this.authService.getProfile()
    .subscribe(resp => this.user = resp)

  }

  toogleSideMenu() {
    this.hideSiteMenu.update((prevState) => !prevState);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
