
import { JwtPayload } from 'jsonwebtoken';



import { NextFunction, Request, Response } from "express";
import AppError from '../errorHelpers/AppError';

import { envVars } from '../config/env';
import httpStatus from 'http-status-codes';

import { verifyToken } from '../utils/jwt';
import { Auth } from '../modules/Auth/auth.model';
import { IsActive } from '../interface/enums';




export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization || req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError(403, "No Token Received")
        }


        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload


        const isUserExist = await Auth.findOne({ email: verifiedToken.email })
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User Does Not Exist")
        }


        if (isUserExist.isActive === IsActive.BLOCKED) {
            throw new AppError(httpStatus.BAD_REQUEST, `User Is ${isUserExist.isActive}`)
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You Are Not Permitted To View This Route ")
        }


        req.user = verifiedToken

        next()
    } catch (error) {
        next(error)
    }
}