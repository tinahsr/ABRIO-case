import {Component, OnInit} from '@angular/core';
import {CartService, EditCartDTO, GetCartDTO} from '../../api/cart.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import {GetProductDTO, ProductService} from '../../api/product.service';
import {FormControl, FormsModule} from '@angular/forms';

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
    protected productService: ProductService,
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

  updateItemCount(item: GetCartDTO, newCount: Event): void {
    const target = newCount.target as HTMLInputElement;

    if (target.value.trim().length == 0 || Number(target.value) < 0) {
      this.fetchCart(); Number(target.value)
    } else {
      const body: EditCartDTO = {
        productId: item.id,
        count: Number(target.value)
      };

      this.cartService.updateCart(body).subscribe({
        next: (res) => {
          console.log('Cart updated', res);
          this.fetchCart();
        },
        error: (err) => {
          console.error('Failed to update cart', err);
          this.fetchCart();
        }
      });
    }
  }

  removeFromCart(itemId: string): void {
    console.log('removeFromCart', itemId);
    this.cartService.deleteCartItem(itemId)
      .subscribe(() => {
          this.fetchCart();
      });

  }
}
