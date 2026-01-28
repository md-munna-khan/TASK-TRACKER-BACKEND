import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";
import AppError from "../../errorHelpers/AppError";

import { AuthServices } from "./auth.service";
import { createUserToken } from "../../utils/userToken";

export const AuthController = {

  credentialsLogin: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);
    const userTokens = await  createUserToken(result)
    setAuthCookie(res, {
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: null,
    });
  }),

  getNewAccessToken: catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, "Refresh token missing");
    }

    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New access token generated",
      data: null,
    });
  }),

  logout: catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "none" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Logged out successfully",
      data: null,
    });
  }),

  getMe: catchAsync(async (req: Request, res: Response) => {
    const decoded = req.user as { userId: string };
    const user = await AuthServices.getMe(decoded.userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile retrieved successfully",
      data: user,
    });
  })
};
