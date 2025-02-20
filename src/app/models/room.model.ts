export interface Room {
  id: string;
  number: number;
  capacity: number;
  comfortLevel: 'luxury' | 'semi-luxury' | 'standard';
  price: number;
}
