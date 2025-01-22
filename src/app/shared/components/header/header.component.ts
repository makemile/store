import { CommonModule } from '@angular/common';
import { Component, inject,signal} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hideSiteMenu = signal(true);
  hideHeader = signal(false);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;


  toogleSideMenu() {
    this.hideSiteMenu.update((prevState) => !prevState);
  }
};
