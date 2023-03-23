import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities";
import { AppError } from "../errors";

export const ensureUserIsOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const userId = req.user.id;
  const contactId = req.params.id;

  const findContact = await contactRepository
    .createQueryBuilder()
    .from(Contact, "contact")
    .leftJoin("contact.user", "user")
    .select(["contact", "user.id"])
    .where("contact.id = :id", { id: contactId })
    .getOne();

  if (findContact?.user.id !== userId) {
    throw new AppError("You don't have permission to access this contact", 403);
  }

  return next();
};
