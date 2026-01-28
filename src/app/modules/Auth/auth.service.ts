import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

import AppError from "../../errorHelpers/AppError";


import { Auth } from "./auth.model";
import { LoginPayload } from "./auth.interface";
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userToken";
import { IsActive } from "../../interface/enums";


export const AuthServices = {


    loginUser: async (payload: LoginPayload) => {
        const { email, password } = payload;

        const user = await Auth.findOne({ email });
        if (!user) {
            throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");
        }

        if (user.isActive === IsActive.BLOCKED) {
            throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");
        }
        return user;
    },

    getNewAccessToken: async (refreshToken: string) => {
        const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
        return { accessToken };
    },

    getMe: async (userId: string) => {
        const user = await Auth.findById(userId).select("-password");
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found");
        }
        return user;
    },
};
