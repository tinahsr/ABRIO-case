import {Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {ApiConfigService} from './api-config.service';
import {Observable} from 'rxjs';

export interface GetCategory {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl: string;


  constructor(private http: HttpClient, config: ApiConfigService) {
    this.apiUrl = `${config.getBaseUrl()}/category`;
  }

  getCategories(): Observable<GetCategory[]> {

    return this.http.get<GetCategory[]>(`${this.apiUrl}/all`,);
  }
}
