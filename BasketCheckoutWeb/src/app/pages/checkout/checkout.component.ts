import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { CheckoutInfoQuery } from '../../stores/checkout-info.query';
import { CheckoutInfoService } from '../../stores/checkout-info.service';
import { BasketProductState } from '../../stores/checkout-info.state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  productCount$ = this._checkoutInfoQuery.productCount$;
  subTotal$ = this._checkoutInfoQuery.productSubTotal$;

  productForms = new FormArray([]);
  form = new FormGroup({
    products: this.productForms,
  });

  constructor(
    private _checkoutInfoQuery: CheckoutInfoQuery,
    private _checkoutInfoService: CheckoutInfoService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._checkoutInfoQuery.products$
      .pipe(takeUntil(this._destroy$))
      .subscribe(products => {

        if (this.productForms.length === 0) {
          products.forEach((p) => {
            const productForm = new FormGroup({
              sku: new FormControl(p.sku),
              name: new FormControl(p.name),
              quantity: new FormControl(p.quantity),
              price: new FormControl(p.price),
            });
            this.productForms.push(productForm);
          });
        } else {
          this.productForms.patchValue(products, {
            emitEvent: false
          });
        }

        this._changeDetectorRef.detectChanges();
      });
  }

  handleRemove(product: BasketProductState, index: number) {
    this.productForms.removeAt(index);
    this._checkoutInfoService.removeProduct(product.sku);
  }

  handleChangeQuantity(sku: number, quantity: number) {
    this._checkoutInfoService
      .changeQuantity(sku, quantity);
  }

  getAsProductFormGroup(productForm: AbstractControl) {
    return productForm as FormGroup;
  }

  trackBySku(index: number, productForm: AbstractControl) {
    return productForm.value.sku;
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
