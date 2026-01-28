import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

import { generateToken, verifyToken } from "./jwt";
import httpStatus from 'http-status-codes';
import { Auth } from "../modules/Auth/auth.model";
import { IUser } from "../modules/Auth/auth.interface";
import { IsActive } from "../interface/enums";


export const createUserToken = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    return {
        accessToken,
        refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

    const isUserExist = await Auth.findOne({ email: verifiedRefreshToken.email })
    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Does Not Exist")
    }

    if (isUserExist.isActive === IsActive.BLOCKED) {
        throw new AppError(httpStatus.BAD_REQUEST, `User Is ${isUserExist.isActive}`)
    }


    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)
    return accessToken

}