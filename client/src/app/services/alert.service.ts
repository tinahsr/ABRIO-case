import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'info';

export interface Alert {
  message: string;
  type: AlertType;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  alerts = signal<Alert[]>([]);

  show(message: string, type: AlertType = 'info') {
    this.alerts.update((current) => [...current, { message, type }]);
    setTimeout(() => this.remove(message), 5000);
  }

  remove(message: string) {
    this.alerts.update((current) => current.filter(a => a.message !== message));
  }

  clear() {
    this.alerts.set([]);
  }
}
