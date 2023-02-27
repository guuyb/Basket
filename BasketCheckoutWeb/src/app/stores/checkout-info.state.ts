export interface CheckoutInfoState {
  products: BasketProductState[];
}

export interface BasketProductState {
  sku: number;
  name: string;
  quantity: number;
  price: number;
}
