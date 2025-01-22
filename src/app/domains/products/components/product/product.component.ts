import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/model/product.model';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    this.addToCart.emit(this.product);
  };
};
