import { Component, computed, inject, input, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
import { RequestMockService } from '../services/request-mock.service';
import { Subscription } from '../models/subscription.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IsSubscriptionUrgentPipe } from '../pipes/is-urgent.pipe';

@Component({
  selector: 'app-subscription-details',
  imports: [
    DatePipe,
    IsSubscriptionUrgentPipe
  ],
  template: `
    <div class="flex items-center">
      <div class="grow">
        <h1>{{client()?.name}}</h1>
        <div>{{subscription()?.type}}</div>
        <div>{{subscription()?.validUntil | date: 'dd/MM/yyyy'}}</div>
      </div>
      <div class="w-[20%]">
        @if (subscription()?.status === 'VALIDATED'){
          <span class="p-2 border-b-green-500 text-green-500 bg-green-200">ACTIF</span>
        } @else if (subscription() | isUrgent){
          <span class="p-2 border-b-red-500 text-red-500 bg-red-200">⚠︎ Urgent</span>
        }
      </div>
<!--      <div class="w-[10%]">-->
<!--        <span class="text-4xl">➜</span>-->
<!--      </div>-->
    </div>
  `,
  styles: ``,
})
export class SubscriptionDetails {
  private http = inject(RequestMockService);

  subscription = input<Subscription | null>(null)
  client = computed(() => {
    if (this.subscription()) {
      return toSignal(this.http.getClientById(this.subscription()!.clientId));
    }
    return;
  });

  constructor(private router: Router) {
    // const navigation = this.router.currentNavigation();
    // this.subscription = signal(navigation?.extras.state?.['subscription'] || {});
  }
}
