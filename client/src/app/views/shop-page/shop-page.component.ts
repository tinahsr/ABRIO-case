import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {FilterComponent} from '../../components/filter/filter.component';
import {CartComponent} from '../../components/cart/cart.component';
import {map, Observable, tap} from 'rxjs';
import {GetProductDTO, ProductService} from '../../api/product.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'shop-page',
  standalone: true,
  templateUrl: './shop-page.component.html',
  imports: [
    ProductCardComponent,
    FilterComponent,
    CartComponent,
    AsyncPipe
  ],
})
export class ShopPageComponent implements OnInit {

  products$!: Observable<GetProductDTO[]>;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {

    this.fetchProducts();
  }

  fetchProducts(): void {
    this.products$ = this.productService.getProducts()
  }
}
