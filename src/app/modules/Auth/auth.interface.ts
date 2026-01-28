import { IsActive, Role } from "../../interface/enums";


export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive?: IsActive;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface LoginPayload {
    email: string;
    password: string;
}