import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce(
      (total, priceProduct: Product) => total + priceProduct.price,
      0
    );
  });
  
  constructor() {}

  addToCart(product: Product) {
    this.cart.update((state) => [...state, product]);
  }
}
