import { Injectable } from '@angular/core';

import { BasketProductState } from './checkout-info.state';
import { CheckoutInfoStore } from './checkout-info.store';

@Injectable({ providedIn: 'root' })
export class CheckoutInfoService {
  _maxProductQuantity = 10;

  constructor(private _store: CheckoutInfoStore) { }

  addProduct(addingProduct: BasketProductState) {
    this._store.update((state) => {
      const addedProduct = state.products.find(
        (p) => p.sku === addingProduct.sku
      );

      const products = state.products.filter(
        (p) => p.sku !== addingProduct.sku
      );

      products.push({
        ...addingProduct,
        quantity: Math.min(
          addingProduct.quantity + (addedProduct?.quantity ?? 0),
          this._maxProductQuantity
        ),
      });

      return {
        ...state,
        products,
      };
    });
  }

  removeProduct(sku: number): void {
    this._store.update((state) => ({
      ...state,
      products: state.products.filter((p) => p.sku !== sku),
    }));
  }

  changeQuantity(sku: number, quantity: number): void {
    this._store.update((state) => {
      if (quantity <= 0) {
        throw new Error('Quantity can\'t be less or equals zero');
      }

      const products = [...state.products].map(p => {
        if (p.sku !== sku) {
          return p;
        }
        return {
          ...p,
          quantity: Math.min(quantity, this._maxProductQuantity)
        };
      });

      return { ...state, products };
    });
  }
}
