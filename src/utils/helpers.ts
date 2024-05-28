import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";

import { handleResponse } from "../utils/response";
import appConfig from "../configs";
import { IToken } from "./types";

const { saltRounds, hashPepper, sessionLifeSpan, jwtSecret } = appConfig;

export async function asyncWrapper(
  callback: () => Promise<Response>,
  res: Response
) {
  try {
    const result = await callback();
    return result;
  } catch (err) {
    handleResponse({
      res,
      err,
      message: `Internal Server Error:  ${err.message}`,
      status: 500,
    });
  }
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password + hashPepper, salt);
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(plainPassword + hashPepper, hashedPassword);
}

export function generateToken({
  data,
  expiresIn = sessionLifeSpan,
  audience = "web",
}: {
  data: IToken;
  expiresIn?: number;
  audience?: "web" | "app";
}) {
  return jwt.sign(data, jwtSecret, {
    expiresIn,
    issuer: `speedycardLister`,
    audience: `${audience}-user`,
  });
}
