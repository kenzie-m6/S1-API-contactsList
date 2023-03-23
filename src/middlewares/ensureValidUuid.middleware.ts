import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";

export const ensureValidUuidMiddleware =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    schema.parse(id);
    return next();
  };
