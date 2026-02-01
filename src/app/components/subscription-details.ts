import { Component, DestroyRef, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { RequestMockService } from '../services/request-mock.service';
import { Subscription } from '../models/subscription.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { IsSubscriptionUrgentPipe } from '../pipes/is-urgent.pipe';
import { Client } from '../models/client.model';
import { IsSubscriptionActivePipe } from '../pipes/is-active.pipe';

@Component({
  selector: 'app-subscription-details',
  imports: [
    DatePipe,
    IsSubscriptionUrgentPipe,
    IsSubscriptionActivePipe
  ],
  template: `
    <div
      class="p-2 flex items-center w-full border border-slate-400 rounded-md hover:bg-slate-200 cursor-pointer select-none">
      <div class="grow">
        @if (showTitle()) {
          <h1 class="text-3xl font-bold">{{ client()?.name ?? 'Unnamed' }}</h1>
        }
        <div>{{ subscription()?.type }}</div>
        <div>{{ subscription()?.validUntil | date: 'dd/MM/yyyy' }}</div>
      </div>
      <div class="w-[20%] text-right">
        @if (subscription() | isActive) {
          <span class="p-2 border rounded-md border-b-green-500 text-green-500 bg-green-200">ACTIF</span>
        } @else if (subscription() | isUrgent) {
          <span
            class="p-2 border rounded-md border-b-red-500 text-red-500 bg-red-200 whitespace-nowrap">⚠︎ Urgent</span>
        }
      </div>
    </div>
  `,
  styles: `:host { width: 100%;}`,
})
export class SubscriptionDetails {
  showTitle = input(true);
  subscription = input<Subscription | null>(null)
  client: WritableSignal<Client| undefined> = signal(undefined);

  private destroyRef = inject(DestroyRef);
  private http = inject(RequestMockService);

  constructor() {
    effect(() => {
      if (this.subscription()) {
        this.http.getClientById(this.subscription()!.clientId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((client) => this.client.set(client))
      }
    });
  }
}
