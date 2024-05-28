import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { IRequest, IToken } from "../utils/types";
import { handleResponse } from "../utils/response";
import { User } from "@prisma/client";
import appConfig from "../configs";
import { prisma } from "../configs/persistence/database";

export const requireAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.decoded) {
    return handleResponse({
      res,
      message: "authentication is required",
      status: 401,
    });
  }

  const { ref } = req.decoded;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: ref,
      },
    });
    if (!user) {
      return handleResponse({
        res,
        message: "authorization failed",
        status: 401,
      });
    }

    req.user = user;

    return next();
  } catch (err) {
    return handleResponse({
      res,
      message: `Authentication error: ${err.message}`,
      status: 401,
      err,
    });
  }
};

export const validateToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization as string;
  token = token?.replace("Bearer ", "");

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret);

    req.decoded = decoded as IToken;

    return next();
  } catch (err) {
    if (err.name) {
      if (err.name === "JsonWebTokenError") {
        return handleResponse({
          res,
          message: "invalid token",
          status: 401,
          err,
        });
      } else if (err.name === "TokenExpiredError") {
        return handleResponse({
          res,
          message: "authentication expired. Please login again",
          status: 401,
          err,
        });
      }
    }
  }
};
