import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../models/client.model';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-intention',
  templateUrl: './payment-intention.component.html',
  styleUrls: ['./payment-intention.component.css'],
})
export class PaymentIntentionComponent {
  @Input() client: Client | null = null;
  @Input() totalAmount: number | undefined = 0;
  @Output() closeModal = new EventEmitter<void>();

  amount: number = 0;
  discount: number = 0;
  showAlert: boolean = false;

  constructor(
    private toastr: ToastrService,
    private paymentService: PaymentService
  ) {}

  submitPaymentIntent() {
    if(this.amount > this.totalAmount!){
      this.toastr.error("El valor a pagar es superior a la deuda");
      return;
    }
    if (this.client) {
      const payload = {
        id: this.client.identityCard,
        identityCard: this.client.identityCard,
        amount: this.amount,
      };
      this.paymentService.registerPayment(payload).subscribe({
        next: () => {
          this.toastr.success('Pago registrado correctamente');
        },
        error: (error) => {
          this.toastr.error("El cliente no tiene los 120 días de mora");
        },
      });
      setTimeout(() => {
        this.onClose();
      }, 2000);
    }
  }

  get amountToPay(): number {
    const discountThreshold = 0.4 * (this.totalAmount || 0);
    let discount = 0;

    if (this.amount > discountThreshold) {
      discount = 0.05 * (this.totalAmount || 0);
    }

    return (this.totalAmount || 0) - discount;
  }

  validateAmount() {
    if (this.amount > this.totalAmount!) {
      this.toastr.error("No se puede agregar más que el valor de la deuda");
    }
  }

  onClose() {
    this.closeModal.emit();
  }
}
