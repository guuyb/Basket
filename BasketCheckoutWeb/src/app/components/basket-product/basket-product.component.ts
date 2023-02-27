import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BasketProductState } from 'src/app/stores/checkout-info.state';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketProductComponent implements OnInit, OnDestroy {

  private _subscription?: Subscription;

  @Input() productForm: FormGroup | null = null;
  @Output() remove = new EventEmitter<BasketProductState>();
  @Output() changeQuantity = new EventEmitter<number>();

  quantityOptions: number[];

  constructor() {
    this.quantityOptions = [...Array(10)].map((_, i) => 1 + i);
  }

  ngOnInit(): void {
    this._subscription = this.productForm?.valueChanges
      .subscribe((product) => {
        this.changeQuantity.emit(product.quantity);
      });
  }

  getLinePrice(product: BasketProductState) {
    return product.price * product.quantity;
  }

  handleClick(product: BasketProductState) {
    this.remove.emit(product);
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
