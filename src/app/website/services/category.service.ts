import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { environment } from 'src/app/core/constants/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private http = inject(HttpClient);
getCategory(){
  return this.http.get<Category[]>(`${environment.API_URL}/categories`)
}

  constructor() { }
}
