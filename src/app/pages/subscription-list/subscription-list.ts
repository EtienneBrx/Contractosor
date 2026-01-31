import { Component, DestroyRef, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { RequestMockService } from '../../services/request-mock.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Subscription, SubscriptionType } from '../../models/subscription.model';
import { Router, RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { SubscriptionDetails } from '../../components/subscription-details';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-subscription-list',
  imports: [
    KeyValuePipe,
    FormField,
    SubscriptionDetails,
    RouterLink,
    MatButton
  ],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.css',
})
export class SubscriptionList {
  private readonly http = inject(RequestMockService);
  private destroyRef = inject(DestroyRef);
  currentPage = signal(1);

  protected readonly SubscriptionType = SubscriptionType;
  protected subscriptionList: WritableSignal<Subscription[] | undefined> = signal(undefined);
  protected filterForm = form(signal({
    name: '',
    type: ''
  }));

  constructor() {
    this.http.getSubscriptions().pipe(takeUntilDestroyed()).subscribe(subscriptions => {
      this.subscriptionList.set(subscriptions);
    })
    effect(() => {
      this.searchSubscriptions();
    });
  }

  loadMore(){
    this.currentPage.update(c => c + 1);
      this.http.getSubscriptions(this.currentPage()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(subscriptions => {
        this.subscriptionList.update(list => (list || []).concat(subscriptions));
    });
  }

  searchSubscriptions() {
    this.http.searchSubscriptions(this.filterForm().value())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(subscriptions => this.subscriptionList.set(subscriptions))
  }

  resetType() {
    this.filterForm.type().value.set('');
  }
}
