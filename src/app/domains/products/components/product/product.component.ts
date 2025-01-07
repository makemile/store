import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('click form child');
    this.addToCart.emit(this.product);
  };
};
