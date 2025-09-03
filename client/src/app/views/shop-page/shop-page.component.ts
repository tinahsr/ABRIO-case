import {Component, OnInit} from '@angular/core';
import {ProductCardComponent} from '../../components/product-card/product-card.component';
import {FilterComponent} from '../../components/filter/filter.component';
import {CartComponent} from '../../components/cart/cart.component';
import {map, Observable, switchMap, tap} from 'rxjs';
import {FilterDTO, GetProductDTO, ProductService} from '../../api/product.service';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.products$ = this.route.queryParams.pipe(
      map(params => this.mapQueryParamsToFilter(params)),
      switchMap(filter => this.productService.getProducts(filter))
    );
  }

  fetchProducts(): void {
    this.products$ = this.productService.getProducts()
  }

  private mapQueryParamsToFilter(params: Params): FilterDTO {
    const filter: FilterDTO = {};

    if (params['categories']) {
      filter.categories = Array.isArray(params['categories'])
        ? params['categories']
        : [params['categories']];
    }

    if (params['colors']) {
      filter.colors = Array.isArray(params['colors'])
        ? params['colors']
        : [params['colors']];
    }

    if (params['sortOrder']) {
      filter.sortOrder = params['sortOrder'];
    }

    return filter;
  }
}
