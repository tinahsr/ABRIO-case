import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly baseUrl = 'http://localhost:8080';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
