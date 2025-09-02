import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from './api-config.service';

export interface GetProductDTO {
  id: string;
  name: string;
  price: number;
  categories?: string[];
  colors?: string[];
}

export interface FilterDTO {
  categories?: string[] | string;
  colors?: string[] | string;
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

    return this.http.get<GetProductDTO[]>(`${this.apiUrl}/allProducts`, { params });
  }


  getProductPicture(image: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/productPicture/${image}`, {
      responseType: 'blob'
    });
  }
}
