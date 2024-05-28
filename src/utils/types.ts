
import { User } from "@prisma/client";
import { Request } from "express";


export interface IRequest extends Request {
  user?: User
  decoded?: IToken;
  // role?: string;
  // userAuth: IAuth;
}

export interface IToken {
  // ref: Types.ObjectId;
  ref: string;
}
