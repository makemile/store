import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Product } from '@/shared/model/product.model';
import { CartService } from '@/shared/services/cart.service';
import { ProductService } from '@/shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private ProductService = inject(ProductService);

  ngOnInit() {
    this.ProductService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    });

  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
