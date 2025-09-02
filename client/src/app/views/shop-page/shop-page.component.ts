import {Component} from '@angular/core';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {FilterComponent} from '../../components/filter/filter.component';
import {CartComponent} from '../../components/cart/cart.component';

@Component({
  selector: 'shop-page',
  standalone: true,
  templateUrl: './shop-page.component.html',
  imports: [
    ProductCardComponent,
    FilterComponent,
    CartComponent
  ],
})
export class ShopPageComponent  {

  constructor(
  ) {}

}
