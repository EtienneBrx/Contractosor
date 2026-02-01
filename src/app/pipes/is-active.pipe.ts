import { Pipe, PipeTransform } from '@angular/core';
import { isSubscriptionDateExpired, Subscription, SubscriptionStatus } from '../models/subscription.model';

@Pipe({
  name: 'isActive'
})
export class IsSubscriptionActivePipe implements PipeTransform {
  transform(sub: Subscription | null): boolean {
    return sub?.status === SubscriptionStatus.VALIDATED && isSubscriptionDateExpired(sub);
  }
}
