import { Response } from "express";
import z from "zod";

import { IRequest } from "../../../utils/types";
import {
  asyncWrapper,
  hashPassword,
} from "../../../utils/helpers";
import { signUpSchema } from "../auth.validation";
import { handleResponse } from "../../../utils/response";
import { prisma } from "../../../configs/persistence/database";

async function signUp(req: IRequest, res: Response) {
  const { firstName, lastName, email, password }: z.infer<typeof signUpSchema> =
    req.body;

  await asyncWrapper(async () => {
    let user;

    user = await prisma.user.findFirst({ where: { email } });
    if (user)
      handleResponse({ res, status: 400, message: "user already exist" });

    const hashedPassword = await hashPassword(password);
    user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
    });

    delete user.password;
    return handleResponse({ res, data: user, message: "successful" });
  }, res);
}

export default signUp;
