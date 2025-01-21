import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule,NgbModalModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() cardObj: any;

  private modalService = inject(NgbModal);

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
		modalRef.componentInstance.data = this.cardObj;
  }
}
