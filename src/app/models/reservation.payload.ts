export interface ReservationPayload {
  roomNumber: number | null;
  checkIn: Date | null;
  checkOut?: Date | null;
  note?: string | null;
}
