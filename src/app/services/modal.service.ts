import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalDataSignal = signal<any | null>(null);

  // Expose the signal for reading
  modalOpened = this.modalDataSignal;

  // Method to set data
  openModal(newData: any) {
    this.modalDataSignal.set(newData);
  }
}
