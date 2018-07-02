import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  addCategory(category): Observable<any> {
    return this.http.post(`http://localhost:3000/categories`, category);
  }

  getCategories(): Observable<any> {
    return this.http.get('http://localhost:3000/categories');
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put(`http://localhost:3000/categories/${category.id}`, category);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/categories/${id}`);
  }
}
