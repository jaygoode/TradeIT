export interface User {
  id: number;
  name: string;
  password: string | undefined;
  role: UserRole;
  email: string;
  avatar: string | undefined;
}

export interface UserReducerState {
  userList: User[];
  currentUser: User | undefined;
}

export type UserRole = "customer" | "admin";

export interface LoginType {
  email: string;
  password: string;
}
