import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Client, Tier } from '../models/client.model';
import { Subscription, SubscriptionType, SubscriptionStatus, Currency } from '../models/subscription.model';
import clientsData from '../../assets/data/clients.json';
import subscriptionsData from '../../assets/data/subscriptions.json';

@Injectable({
  providedIn: 'root'
})
export class RequestMockService {

  constructor() { }

  private parseClients(): Client[]{
    return (clientsData as any[]).map(c => ({
      clientId: c.clientId,
      name: c.name,
      tier: c.tier as Tier,
      country: c.country
    }));
  }

  private parseSubscriptions(): Subscription[] {
    return (subscriptionsData as any[]).map(s => ({
      id: s.id,
      clientId: s.clientId,
      type: s.type as SubscriptionType,
      amount: s.amount,
      currency: s.currency as Currency,
      validUntil: new Date(s.validUntil),
      status: s.status.toUpperCase() as SubscriptionStatus
    }));
  }

  getClients(page: number = 1, pageSize: number = 10): Observable<Client[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedClients = this.parseClients().slice(startIndex, endIndex);
    return of(paginatedClients).pipe(delay(3000));
  }

  getClientById(clientId: string): Observable<Client | undefined> {
    const foundClient = this.parseClients().find(c => c.clientId === clientId);
    return of(foundClient).pipe(delay(1500));
  }

  getSubscriptions(page: number = 1, pageSize: number = 10): Observable<Subscription[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedSubscriptions = this.parseSubscriptions().slice(startIndex, endIndex);
    return of(paginatedSubscriptions).pipe(delay(4000));
  }

  getSubscriptionsByClientId(clientId: string, page: number = 1, pageSize: number = 10): Observable<Subscription[]> {
    const filteredSubscriptions = this.parseSubscriptions().filter(sub => sub.clientId === clientId);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);
    return of(paginatedSubscriptions).pipe(delay(2000));
  }
}
