import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
