import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (bodySchema?: ZodSchema, paramsSchema?: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (bodySchema) {
        bodySchema.parse(req.body);
      }
      if (paramsSchema) {
        paramsSchema.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Validation Error",
          message: error.errors[0].message
        });
        return;
      }
      next(error);
    }
  };
};
