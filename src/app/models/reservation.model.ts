import { User } from './user.model';

export interface Reservation {
  id: string;
  roomNumber: number;
  checkIn: Date;
  checkOut: Date;
  note: string | null;
  status: string;

  clientId: User;
}

export interface ReservationPayload {
  roomNumber?: number;
  checkIn?: Date;
  checkOut?: Date;
  note?: string;
}

export interface ReservationFilter {
  roomNumber?: number ;
  checkIn?: Date;
  checkOut?: Date;
  clientId?: string;
  my?: boolean;
  status?: string;
}
