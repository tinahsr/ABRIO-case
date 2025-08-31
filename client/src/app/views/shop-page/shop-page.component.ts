import {Component} from '@angular/core';
import {ProductCardComponent} from '../../components/product-card/product-card.component';

@Component({
  selector: 'shop-page',
  standalone: true,
  templateUrl: './shop-page.component.html',
  imports: [
    ProductCardComponent
  ],
})
export class ShopPageComponent  {

  constructor(
  ) {}

}
