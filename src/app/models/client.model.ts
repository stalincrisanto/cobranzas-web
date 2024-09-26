export interface Client {
  id: string;
  identityCard: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  debt: Debt;
}

export interface Debt {
  totalValue: number;
  expiredDays: number;
}
