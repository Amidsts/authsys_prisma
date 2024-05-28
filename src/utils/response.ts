import { Response } from "express";

export type handleResponseArgType = {
  res: Response;
  data?: any;
  status?: number;
  err?: any;
  message?: string;
};


export const handleResponse = ({
  res,
  data,
  status = 200,
  err,
  message,
}: handleResponseArgType): Response => {
  if (err) console.log("Error  ", err);

  return res.status(status).json({
    message,
    data,
  });
};

