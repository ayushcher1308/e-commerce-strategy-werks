import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterSignalService {
  private dataSignal = signal<any | null>(null);

  // Expose the signal for reading
  getDataSignal = this.dataSignal;

  // Method to set data
  setData(newData: any) {
    this.dataSignal.set(null);
    this.dataSignal.set(newData);
  }
}
