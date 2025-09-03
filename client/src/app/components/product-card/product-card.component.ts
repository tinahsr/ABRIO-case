import {Component, Input} from '@angular/core';
import {GetProductDTO, ProductService} from '../../api/product.service';
import {CartService, EditCartDTO} from '../../api/cart.service';
import {AlertService} from '../../services/alert.service';

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
    protected productService: ProductService,
    protected cartService: CartService,
    protected alertService: AlertService,
  ) {}

  addToCart(product: GetProductDTO) {

    let productInventory: number = product.inventory;

    if (productInventory <= 0) {
      this.alertService.show(`Es sind leider keine Exemplare von "${product.name}" mehr auf Lager.`, 'error');
      return;

  }

    const body: EditCartDTO = {
      productId: product.id,
      count: 1,
    };

    this.cartService.addToCart(body);

    product.inventory -= 1;
    console.log('Produkt in den Warenkorb gelegt:', product.name);
  }
}
