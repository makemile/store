import { CommonModule } from '@angular/common';
import { Component, inject,signal} from '@angular/core';
import { CartService } from '@/shared/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hideSiteMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  toogleSideMenu() {
    this.hideSiteMenu.update((prevState) => !prevState);
  }
};
