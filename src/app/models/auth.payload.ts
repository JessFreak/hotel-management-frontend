export interface RegisterPayload {
  firstName: string;
  lastName: string;
  middleName?: string;
  passportNumber: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
