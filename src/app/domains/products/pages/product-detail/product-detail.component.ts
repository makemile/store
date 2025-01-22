import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/model/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('')
  private productService = inject(ProductService);

  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
      });
    }
  }

  changeCover(newImg: string){
this.cover.set(newImg);
  }
}
