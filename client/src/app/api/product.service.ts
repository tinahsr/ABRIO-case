import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {ApiConfigService} from './api-config.service';

export interface GetProductDTO {
  id: string;
  name: string;
  price: number;
  categories?: string[];
  color?: number;
  inventory?: string;
  picture?: string;
}

export interface FilterDTO {
  categories?: string[] | string;
  colors?: string[] | string;
  sortOrder?: SortOrder;
}

export enum SortOrder {
  priceASC = 'priceASC',
  priceDESC = 'priceDESC',
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, config: ApiConfigService) {
    this.apiUrl = `${config.getBaseUrl()}/product`;
  }

  getProducts(filter?: FilterDTO): Observable<GetProductDTO[]> {
    let params = new HttpParams();

    if (filter) {
      Object.keys(filter).forEach(key => {
        const value = (filter as any)[key];
        if (Array.isArray(value)) {
          value.forEach(v => {
            params = params.append(key, v);
          });
        } else if (value !== undefined && value !== null) {
          params = params.append(key, value);
        }
      });
    }
    return this.http.get<GetProductDTO[]>(`${this.apiUrl}/all`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);

        return of([]);
      })
    );
  }

  getProductImage(image: string | undefined): string {
    const value = image == '' ? '' : image;
    if (image == 'empty.png') {
      return `/images/img.png`;
    }
    return `${this.apiUrl}/productPicture/${value}`;
  }
}
