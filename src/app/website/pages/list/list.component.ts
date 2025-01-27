import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ProductComponent } from '../../product/product.component';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/website/services/cart.service';
import { ProductService } from 'src/app/website/services/product.service';
import { CategoryService } from 'src/app/website/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input() category_id?: string;
  products = signal<Product[]>([]);
  category = signal<Category[]>([]);
  private cartService = inject(CartService);
  private ProductService = inject(ProductService);
  private categoryServices = inject(CategoryService);

  ngOnChanges() {
      this.getProducts();
  }

  ngOnInit() {
    this.getCategorys();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getCategorys() {
    this.categoryServices.getCategory().subscribe({
      next: (data) => {
        this.category.set(data);
      },
      error: () => {},
    });
  }

  private getProducts() {
    this.ProductService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {},
    });
  }
}
