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

  _clients = new Map()

  constructor() {}

  private parseClients(): Client[] {
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
    return of(paginatedClients).pipe(delay(500));
  }

  getClientById(clientId: string): Observable<Client | undefined> {
    console.log('client : ' + clientId)
    if (this._clients.has(clientId)) {
      console.log('return cache')
      return of(this._clients.get(clientId));
    } else {
      console.log('get client')
      const foundClient = this.parseClients().find(c => c.clientId === clientId);
      this._clients.set(clientId, foundClient);
      return of(foundClient).pipe(delay(500));
    }
  }

  getSubscriptions(page: number = 1, pageSize: number = 5): Observable<Subscription[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedSubscriptions = this.parseSubscriptions().slice(startIndex, endIndex);
    return of(paginatedSubscriptions).pipe(delay(500));
  }

  getSubscriptionsByClientId(clientId: string, page: number = 1, pageSize: number = 10): Observable<Subscription[]> {
    const filteredSubscriptions = this.parseSubscriptions().filter(sub => sub.clientId === clientId);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);
    return of(paginatedSubscriptions).pipe(delay(500));
  }

  searchSubscriptions(searchParams: { name?: string, type?: string }): Observable<Subscription[]> {
    let filteredSubscriptions: Subscription[] = this.parseSubscriptions();
    if (searchParams.name) {
      const filteredClients = this.parseClients().filter(client => client.name?.toLowerCase().includes(searchParams.name!.toLowerCase()));
      filteredSubscriptions = filteredSubscriptions.filter(sub => filteredClients.some(client => client.clientId === sub.clientId));
    }
    if (searchParams.type) {
      filteredSubscriptions = filteredSubscriptions.filter(sub => sub.type?.toLowerCase() === searchParams.type?.toLowerCase());
    }
    return of(filteredSubscriptions).pipe(delay(500));
  }
}
