import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { CheckoutInfoState } from './checkout-info.state';
import { CheckoutInfoStore } from './checkout-info.store';

@Injectable({ providedIn: 'root' })
export class CheckoutInfoQuery extends Query<CheckoutInfoState> {
  constructor(protected override store: CheckoutInfoStore) {
    super(store);
  }

  productCount$ = this.select((state) =>
    state.products.reduce((sum, product) => sum + product.quantity, 0)
  );

  products$ = this.select(
    (state) => state.products
  );

  productSubTotal$ = this.select((state) =>
    state.products.reduce((sum, product) => {
      return sum + product.quantity * product.price;
    }, 0)
  );
}
