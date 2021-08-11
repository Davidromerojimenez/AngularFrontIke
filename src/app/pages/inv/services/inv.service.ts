import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../interfaces/inv.interface';

@Injectable({
  providedIn: 'root'
})
export class InvService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/products');
  }

  addProduct(prod): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl + '/crear_producto', prod);
  }

  updateStock(productId: number, inventario_stock: number): Observable<any> {
    const body = { "id": productId, "inventario_stock": inventario_stock + 1 };
    return this.http.post<any>(`${this.apiUrl}/actualizar_stock`, body);
  }

  revertStock(productId: number, inventario_stock: number): Observable<any> {
    const body = { "id": productId, "inventario_stock": inventario_stock };
    return this.http.post<any>(`${this.apiUrl}/actualizar_stock`, body);
  }

  saveInv(inv){
    return this.http.post<Product[]>(this.apiUrl, inv);
  }




}
