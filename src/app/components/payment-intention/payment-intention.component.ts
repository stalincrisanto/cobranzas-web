import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-payment-intention',
  templateUrl: './payment-intention.component.html',
  styleUrls: ['./payment-intention.component.css']
})
export class PaymentIntentionComponent {
  @Input() client: Client | null = null;
  @Input() totalAmount: number | undefined = 0;
  @Output() closeModal = new EventEmitter<void>();

  amount: number = 0;
  discount: number = 0;
  showAlert: boolean = false;

  // constructor(private paymentService: PaymentService) {}
  constructor(){}

  submitPaymentIntent() {
    // if (this.client) {
    //   this.paymentService.registerPaymentIntent(this.client.id, this.paymentAmount).subscribe(() => {
    //     this.showAlert = true;
    //     setTimeout(() => {
    //       this.closeModal.emit();
    //     }, 2000); // Cierra el modal después de 2 segundos
    //   });
    // }
  }

  get amountToPay(): number {
    const discountThreshold = 0.4 * (this.totalAmount || 0);
    let discount = 0;

    if (this.amount > discountThreshold) {
      discount = 0.05 * (this.totalAmount || 0);
    }

    return (this.totalAmount || 0) - discount;
  }

  onClose() {
    this.closeModal.emit();
  }
}
