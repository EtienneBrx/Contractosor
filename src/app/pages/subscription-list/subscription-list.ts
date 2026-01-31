import { Component, inject, signal, Signal } from '@angular/core';
import { RequestMockService } from '../../services/request-mock.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription, SubscriptionType } from '../../models/subscription.model';
import { Router, RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { SubscriptionDetails } from '../../components/subscription-details';

@Component({
  selector: 'app-subscription-list',
  imports: [
    KeyValuePipe,
    FormField,
    SubscriptionDetails,
    RouterLink
  ],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.css',
})
export class SubscriptionList {
  private readonly http = inject(RequestMockService);

  protected readonly SubscriptionType = SubscriptionType;
  protected subscriptionList: Signal<Subscription[]> = toSignal(this.http.getSubscriptions(), {initialValue: []});
  protected filterForm = form(signal({
    name: '',
    type: ''
  }));


  constructor(private router: Router) {

  }
}
