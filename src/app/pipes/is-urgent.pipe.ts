import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from '../models/subscription.model';

@Pipe({
  name: 'isUrgent'
})
export class IsSubscriptionUrgentPipe implements PipeTransform {

  transform(subscription: Subscription | null): boolean {
    if (!subscription) {
      return false;
    }

    const validUntil = new Date(subscription.validUntil);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return validUntil < thirtyDaysFromNow;
  }

}
