export interface Discount extends DiscountPayload {
  id: string;
}

export interface DiscountPayload {
  name: string;
  percentage: number;
}
