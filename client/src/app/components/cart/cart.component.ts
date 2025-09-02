import {Component, OnInit} from '@angular/core';
import {CartService, EditCartDTO, GetCartDTO} from '../../api/cart.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import {GetProductDTO} from '../../api/product.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports: [
    AsyncPipe,
    DecimalPipe,
    FormsModule,
  ],
})
export class CartComponent implements OnInit {

  cartItems$!: Observable<GetCartDTO[]>;
  total$!: Observable<number>;

  constructor(
    protected cartService: CartService,
  ) {}

  ngOnInit(): void {

    this.fetchCart();
  }

  fetchCart(): void {
    this.cartItems$ = this.cartService.getCart()
    this.total$ = this.cartItems$.pipe(
      map((items) => this.cartService.getTotalPrice(items))
    );
  }

  updateItemCount(item: GetCartDTO, newCount: number): void {
    const body: EditCartDTO = {
      productId: item.id,
      count: newCount
    };
    console.log(body);
    this.cartService.updateCart(body).subscribe({
      next: (res) => {
        console.log('Cart updated', res);
        this.fetchCart();
      },
      error: (err) => console.error('Failed to update cart', err)
    });
  }

  removeFromCart(itemId: string): void {
    console.log('removeFromCart', itemId);
    this.cartService.deleteCartItem(itemId);
    this.fetchCart();
  }
}
