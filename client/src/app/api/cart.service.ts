import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {ApiConfigService} from './api-config.service';
import {GetProductDTO} from './product.service';

export interface GetCartDTO {
  id: string;
  product: GetProductDTO;
  count: number;
}

export interface EditCartDTO {
  productId: string;
  count: number;
}

export interface OkDTO {
  ok: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient, config: ApiConfigService) {
    this.apiUrl = `${config.getBaseUrl()}/cart`;
  }

  getCart(): Observable<GetCartDTO[]> {
    return this.http.get<GetCartDTO[]>(`${this.apiUrl}/all`);

  }

  addToCart(body: EditCartDTO): Observable<OkDTO> {
    return this.http.post<OkDTO>(this.apiUrl, body);
  }

  updateCart(body: EditCartDTO): Observable<OkDTO> {
    return this.http.patch<OkDTO>(this.apiUrl, body);
  }

  deleteCartItem(cartItemId: string): Observable<OkDTO> {
    return this.http.delete<OkDTO>(`${this.apiUrl}/${cartItemId}`).pipe(
      tap(response => console.log('Deleted:', response)),
      catchError(err => {
        console.error('Delete failed', err);
        return throwError(() => err);
      })
    );
  }

  getTotalPrice(cartItems: GetCartDTO[]): number {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }
}
