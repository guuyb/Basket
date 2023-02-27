import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { CheckoutInfoState } from './checkout-info.state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'checkout-info' })
export class CheckoutInfoStore extends Store<CheckoutInfoState> {
  constructor() {
    super(createInitialState());
  }
}

function createInitialState(): CheckoutInfoState {
  return {
    products: [],
  };
}
