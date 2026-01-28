/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodTypeAny } from "zod";

export const validateRequest =
  (zodSchema: ZodObject<any> | ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      if (req.body.data && typeof req.body.data === "string") {
        req.body = JSON.parse(req.body.data);
      }


      if (req.body.documents && typeof req.body.documents === "string") {
        req.body.documents = JSON.parse(req.body.documents);
      }


      req.body = await zodSchema.parseAsync(req.body);

      next();
    } catch (error: any) {
      console.error("Validation Error:", error.errors || error.message);
      res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors || error.message,
      });
    }
  };
