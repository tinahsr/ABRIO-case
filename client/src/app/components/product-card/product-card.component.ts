import {Component, Input} from '@angular/core';
import {GetProductDTO} from '../../api/product.service';

@Component({
  selector: 'product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  imports: [
  ],
})
export class ProductCardComponent  {

  @Input() product!: GetProductDTO;

  constructor(
  ) {}

}
