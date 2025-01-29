import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { environment } from 'src/app/core/constants/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  constructor() {}
  getProducts(category_id?:string) {
    const url = new URL( `${environment.API_URL}/products`);
    if(category_id){
       url.searchParams.set('categoryId',category_id)
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(
      `${environment.API_URL}/products/${id}`
    );
  }
}
