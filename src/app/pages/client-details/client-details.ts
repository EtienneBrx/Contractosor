import { Component, signal } from '@angular/core';
import { SubscriptionDetails } from '../../components/subscription-details';
import { RequestMockService } from '../../services/request-mock.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Client } from '../../models/client.model';
import { Subscription } from '../../models/subscription.model';

@Component({
  selector: 'app-client-details',
  imports: [
    SubscriptionDetails,
    RouterLink
  ],
  templateUrl: './client-details.html',
  styleUrl: './client-details.css',
})
export class ClientDetails {
  client = signal<Client | null>(null)
  subscriptionList = signal<Subscription[]>([])

  constructor(private http: RequestMockService, private route: ActivatedRoute) {
    this.route.paramMap.pipe(
      takeUntilDestroyed(),
      map(params => params.get('id')),
      switchMap(id => this.http.getClientById(id!)),
      tap((client) => this.client.set(client!)),
      switchMap(client => this.http.getSubscriptionsByClientId(client!.clientId))
    ).subscribe((subs) => this.subscriptionList.set(subs));
  }
}
