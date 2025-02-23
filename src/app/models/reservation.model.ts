import { User } from './user.model';
import { Room } from './room.model';

export interface Reservation {
  id: string;
  roomNumber: number;
  checkIn: Date;
  checkOut?: Date;
  note?: string;
  status: string;
  clientId: User;
}

export interface ReservationDetails {
  reservation: Reservation;
  room: Room;
  totalPrice: number;
}

export interface ReservationPayload {
  roomNumber?: number;
  checkIn?: Date;
  checkOut?: Date;
  note?: string;
}

export interface ReservationFilters {
  roomNumber?: number ;
  checkIn?: Date;
  checkOut?: Date;
  clientId?: string;
  my?: boolean;
  status?: string;
}
