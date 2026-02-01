import { Pipe, PipeTransform } from '@angular/core';
import { isSubscriptionDateExpired, Subscription } from '../models/subscription.model';

@Pipe({
  name: 'isUrgent'
})
export class IsSubscriptionUrgentPipe implements PipeTransform {

  transform(subscription: Subscription | null): boolean {
    return !!subscription && isSubscriptionDateExpired(subscription, 30) && !isSubscriptionDateExpired(subscription);
  }
}
