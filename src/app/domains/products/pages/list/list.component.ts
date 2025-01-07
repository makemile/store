import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/model/product.model';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-list',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
    private cartService = inject(CartService);
  products = signal<Product[]>([]);

  constructor() {
    const initProducts: Product[] = [
      {
        id: Date.now(),
        title: 'pepito',
        price: 10,
        image: 'https://picsum.photos/640/640?r=23',
      },
      {
        id: Date.now(),
        title: 'pepito',
        price: 10,
        image: 'https://picsum.photos/640/640?r=23',
      },
      {
        id: Date.now(),
        title: 'pepito',
        price: 10,
        image: 'https://picsum.photos/640/640?r=23',
      },
      {
        id: Date.now(),
        title: 'pepito',
        price: 10,
        image: 'https://picsum.photos/640/640?r=23',
      },
    ];
    this.products.set(initProducts);
  }
  addToCart(product: Product) {
this.cartService.addToCart(product);
  }
}
