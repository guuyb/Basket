import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketLinkComponent } from './components/basket-link/basket-link.component';
import { BasketProductComponent } from './components/basket-product/basket-product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CheckoutComponent,
    BasketLinkComponent,
    BasketProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
