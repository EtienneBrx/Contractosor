import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'client/:id', loadComponent: () => import('./pages/client-details/client-details').then(m => m.ClientDetails)},
  { path: 'subscriptions', loadComponent: () => import('./pages/subscription-list/subscription-list').then(m => m.SubscriptionList)},
  { path: '', redirectTo: 'subscriptions', pathMatch: 'full'}
];
