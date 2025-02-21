export interface Room {
  id: string;
  number: number;
  capacity: number;
  comfortLevel: 'luxury' | 'semi-luxury' | 'standard';
  price: number;
}

export interface RoomFilter {
  capacity?: number;
  comfortLevel?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
}
