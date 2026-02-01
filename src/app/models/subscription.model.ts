// Different models and enums could be broke down into separate files if we need to make classes or add utils functions
export enum SubscriptionType {
  FINANCE = "FINANCE",
  LEGAL = "LEGAL",
  ASSET = "ASSET"
}

export enum SubscriptionStatus {
  VALIDATED = "VALIDATED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED"
}

export enum Currency {
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP"
}

export interface Subscription {
  id: string;
  clientId: string;
  type: SubscriptionType;
  amount: number;
  currency: Currency;
  validUntil: Date;
  status: SubscriptionStatus;
}

export function isSubscriptionDateExpired(subscription: Subscription, daysBefore: number = 0): boolean {
  const subDate = new Date(subscription.validUntil);
  const todayPlusShift = new Date();
  todayPlusShift.setDate(new Date().getDate() + daysBefore);
  return subDate < todayPlusShift;
}
