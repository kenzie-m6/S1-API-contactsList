import { NextFunction, Request, Response } from "express";
import { z, ZodTypeAny } from "zod";
import { AppError } from "../errors";

export const ensureValidUuidMiddleware =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;

    try {
      schema.parse(id);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError("Invalid uuid", 404);
      }
    }
  };
