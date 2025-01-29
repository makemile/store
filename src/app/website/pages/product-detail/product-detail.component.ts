import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ProductService } from 'src/app/website/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Router, RouterModule } from '@angular/router';
import { ProductDetailRoutingModule } from './product-detail-routing.module';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ProductDetailRoutingModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('')
  private productService = inject(ProductService);

  constructor(private router:Router){}

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

  goToBack(){
    this.router.navigate([''])  }
}
