import {Component, OnInit} from '@angular/core';
import {CartService, EditCartDTO, GetCartDTO} from '../../api/cart.service';
import { DecimalPipe} from '@angular/common';
import {ProductService} from '../../api/product.service';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports: [
    DecimalPipe,
    FormsModule,
  ],
})
export class CartComponent implements OnInit {

  constructor(
    protected cartService: CartService,
    protected productService: ProductService,
  ) {}


  ngOnInit(): void {

    this.cartService.fetchCart();
  }

  get topCartItems() {
    return this.cartService.cart().slice(0, 3);
  }

  updateItemCount(item: GetCartDTO, newCount: Event): void {
    const target = newCount.target as HTMLInputElement;

    if (target.value.trim().length === 0 || Number(target.value) < 0) {
      this.cartService.fetchCart();
    } else {
      const body: EditCartDTO = {
        productId: item.id,
        count: Number(target.value),
      };

      this.cartService.updateCart(body);
    }
  }

  removeFromCart(itemId: string): void {
    this.cartService.deleteCartItem(itemId);
  }
}
