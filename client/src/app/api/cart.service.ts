import {computed, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiConfigService} from './api-config.service';
import {GetProductDTO, ProductService} from './product.service';
import {AlertService} from '../services/alert.service';

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

  constructor(private alertService: AlertService, private http: HttpClient, config: ApiConfigService, private productService: ProductService) {
    this.apiUrl = `${config.getBaseUrl()}/cart`;
  }

  fetchCart() {
    this.http.get<GetCartDTO[]>(`${this.apiUrl}/all`).subscribe((items) => {
      this.cart.set(items);
    });
  }

  addToCart(body: EditCartDTO) {
    this.http.post<OkDTO>(this.apiUrl, body).subscribe({
      next: (res) => {
        if (res.ok) {
          this.fetchCart();

          this.productService.products.update(products =>
            products.map(p =>
              p.id === body.productId ? { ...p, inventory: p.inventory - 1 } : p
            )
          );

          this.alertService.show('Produkt erfolgreich in den Warenkorb gelegt!', 'success');
        } else {
          this.alertService.show(res.message || 'Fehler beim Hinzufügen zum Warenkorb.', 'error');
        }
      },
      error: () => this.alertService.show('Netzwerkfehler beim Hinzufügen zum Warenkorb.', 'error')
    });
  }


  updateCart(body: EditCartDTO) {
    this.http.patch<OkDTO>(this.apiUrl, body).subscribe({
      next: (res) => {
        if (res.ok) {
          this.fetchCart();
          this.productService.getProducts();
          this.alertService.show('Warenkorb erfolgreich aktualisiert.', 'success');
        } else {
          this.alertService.show(res.message || 'Fehler beim Aktualisieren des Warenkorbs.', 'error');
        }
      },
      error: () => this.alertService.show('Leider sind nicht genügend Produkte verfügbar.', 'error')
    });
  }

  deleteCartItem(cartItemId: string) {
    this.http.delete<OkDTO>(`${this.apiUrl}/${cartItemId}`).subscribe({
      next: (res) => {
        if (res.ok) {
          this.fetchCart();
          this.productService.getProducts();
          this.alertService.show('Produkt erfolgreich aus dem Warenkorb entfernt.', 'success');
        } else {
          this.alertService.show(res.message || 'Fehler beim Entfernen des Produkts aus dem Warenkorb.', 'error');
        }
      },
      error: () => this.alertService.show('Netzwerkfehler beim Entfernen des Produkts.', 'error')
    });
  }
}
