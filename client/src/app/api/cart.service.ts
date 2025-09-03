import {computed, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  cart = signal<GetCartDTO[]>([]);
  totalPrice = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.count, 0)
  );

  constructor(private http: HttpClient, config: ApiConfigService) {
    this.apiUrl = `${config.getBaseUrl()}/cart`;
  }

  fetchCart() {
    this.http.get<GetCartDTO[]>(`${this.apiUrl}/all`).subscribe((items) => {
      this.cart.set(items);
    });
  }

  addToCart(body: EditCartDTO) {
    this.http.post<OkDTO>(this.apiUrl, body).subscribe((res) => {
      if (res.ok) {
        this.fetchCart();
      }
    });
  }

  updateCart(body: EditCartDTO) {
    this.http.patch<OkDTO>(this.apiUrl, body).subscribe((res) => {
      if (res.ok) {
        this.fetchCart();
      }
    });
  }

  deleteCartItem(cartItemId: string) {
    this.http.delete<OkDTO>(`${this.apiUrl}/${cartItemId}`).subscribe((res) => {
      if (res.ok) {
        this.fetchCart();
      }
    });
  }
}
