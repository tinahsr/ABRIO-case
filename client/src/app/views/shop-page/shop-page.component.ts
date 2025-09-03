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
  ],
})
export class ShopPageComponent implements OnInit {

  constructor(
    protected productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap(params => {
          const filter = this.mapQueryParamsToFilter(params);
          this.productService.getProducts(filter);
        })
      )
      .subscribe();
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
