import { Routes } from '@angular/router';
import {ShopPageComponent} from './views/shop-page/shop-page.component';

export enum AppRoutes {
  SHOP = '',
}

export const routes: Routes = [
  {
    path: AppRoutes.SHOP,
    title: 'Shop | ABRIO',
    component: ShopPageComponent,
  },
];

