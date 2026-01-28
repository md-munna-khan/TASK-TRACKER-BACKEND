/* eslint-disable no-console */
import bcryptjs from "bcryptjs";

import { envVars } from "../config/env";
import { Auth } from "../modules/Auth/auth.model";
import { IUser } from "../modules/Auth/auth.interface";
import { Role } from "../interface/enums";

export const seedAdmin = async () => {
  try {
    const isAdminExist = await Auth.findOne({
      email: envVars.ADMIN_EMAIL,
    });

    if (isAdminExist) {
      console.log("Admin already exists");
      return;
    }

    console.log("Creating admin user...");

    const hashedPassword = await bcryptjs.hash(
      envVars.ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: IUser = {
      name: "Admin",
      email: envVars.ADMIN_EMAIL,
      password: hashedPassword,
      role: Role.ADMIN,
    };

    const admin = await Auth.create(payload);

    console.log("Admin created successfully");

    if (envVars.NODE_ENV === "development") {
      console.log(admin);
    }
  } catch (error) {
    console.error("Failed to seed admin");

    if (envVars.NODE_ENV === "development") {
      console.error(error);
    }
  }
};
