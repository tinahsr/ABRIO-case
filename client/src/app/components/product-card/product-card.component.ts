import {Component, Input} from '@angular/core';
import {GetProductDTO, ProductService} from '../../api/product.service';
import {CartService, EditCartDTO} from '../../api/cart.service';

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
  ) {}

  addToCart(product: GetProductDTO) {

    let productInventory: number = product.inventory;

    if (productInventory <= 0) {
      alert(`Es sind leider keine Exemplare von "${product.name}" mehr auf Lager.`);
      return;
    }

    const body: EditCartDTO = {
      productId: product.id,
      count: 1,
    };

    this.cartService.addToCart(body).subscribe({
      next: (res) => {
        if (res.ok) {
          product.inventory -= 1;
          console.log('Produkt in den Warenkorb gelegt:', product.name);
        } else {
          alert(res.message || `Fehler beim Hinzufügen von "${product.name}" in den Warenkorb.`);
        }
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen zum Warenkorb:', err);
        alert(`Fehler beim Hinzufügen von "${product.name}" in den Warenkorb.`);
      },
    });
  }
}
