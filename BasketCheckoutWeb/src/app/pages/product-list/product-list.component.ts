import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { CheckoutInfoQuery } from '../../stores/checkout-info.query';
import { CheckoutInfoService } from '../../stores/checkout-info.service';
import { ProductState } from './product.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  constructor(
    private _productsService: ProductsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _checkoutInfoService: CheckoutInfoService,
    private _checkoutInfoQuery: CheckoutInfoQuery
  ) { }

  private _destroy$ = new Subject<void>();

  products: ProductState[] = [];
  productCount$ = this._checkoutInfoQuery.productCount$;

  ngOnInit() {
    this._productsService
      .getProducts$()
      .pipe(takeUntil(this._destroy$))
      .subscribe((products) => {
        // could be mapping logic
        this.products = products;
        this._changeDetectorRef.detectChanges();
      });
  }

  addToBasket(product: ProductState) {
    this._checkoutInfoService.addProduct({ ...product, quantity: 1 });
  }

  trackBySku(index: number, item: ProductState) {
    return item.sku;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
