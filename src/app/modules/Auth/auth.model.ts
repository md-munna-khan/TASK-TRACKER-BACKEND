
import { Schema, model } from "mongoose";
import { IUser } from "./auth.interface";
import { IsActive, Role } from "../../interface/enums";


const AuthSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
  },
  { timestamps: true }
);

export const Auth = model<IUser>("Auth", AuthSchema);
