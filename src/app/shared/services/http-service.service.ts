import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from 'src/app/models/products.interface';
import { UserInterface } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private readonly BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.BASE_URL + 'users/1');
  }

  getProductsList(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.BASE_URL + 'products');
  }

  addProduct(prod: ProductInterface) {
    return this.http.post<ProductInterface>(this.BASE_URL + 'products', prod);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.BASE_URL + 'products/' + id);
  }

  getProductDetailsById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(this.BASE_URL + 'products/' + id);
  }

  updateProductData(prodDet: ProductInterface): Observable<ProductInterface> {
    return this.http.put<ProductInterface>(this.BASE_URL + 'products/' + prodDet.id, prodDet);
  }

  filterOutData(filString: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.BASE_URL + 'products?productName_like=' + filString);
  }
}
