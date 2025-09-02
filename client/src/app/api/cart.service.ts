import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from './api-config.service';

export interface GetCartDTO {
  id: string;
  productId: string;
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
    this.apiUrl = `${config.getBaseUrl()}/product`;
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
    return this.http.delete<OkDTO>(`${this.apiUrl}/${cartItemId}`);
  }
}
