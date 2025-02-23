export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  passportNumber: string;
  role: string;
}

export interface UserFilters {
  email?: string;
  name?: string;
  passportNumber?: string;
  role?: string;
}
