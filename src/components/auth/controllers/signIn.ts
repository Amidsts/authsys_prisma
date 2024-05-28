import { Response } from "express";
import z from "zod";

import { IRequest } from "../../../utils/types";
import {
  asyncWrapper,
  comparePassword,
  generateToken,
} from "../../../utils/helpers";
import { signInSchema } from "../auth.validation";
import { handleResponse } from "../../../utils/response";
import { prisma } from "../../../configs/persistence/database";

async function signIn(req: IRequest, res: Response) {
  const { email, password }: z.infer<typeof signInSchema> = req.body;

  await asyncWrapper(async () => {
    let user;

    user = await prisma.user.findFirst({ where: { email } });
    if (!user)
      handleResponse({ res, status: 400, message: "Invalid credential" });

    const samePassword = comparePassword(password, user.password);
    if (!samePassword)
      handleResponse({ res, status: 400, message: "Invalid credential" });

    const token = generateToken({ data: { ref: user.id } });
    return handleResponse({
      res,
      data: { token, user },
      message: "successful",
    });
  }, res);
}

export default signIn;
