import { Component } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
})
export class ClientSearchComponent {
  identityCard: string = '';
  client: Client | null = null;
  showPaymentModal: boolean = false;
  havePaymentAgreemnt: boolean = false;

  constructor(
    private toastr: ToastrService,
    private clientService: ClientService
  ) {}

  searchClient() {
    this.clientService.getClientById(this.identityCard).subscribe({
      next: (data) => {
        if (data) {
          this.client = data;
        } else {
          this.client = null;
          this.toastr.error('Cliente no encontrado. Intente nuevamente.', 'Error');
        }
      },
    });
  }

  openPaymentModal() {
    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
  }
}
