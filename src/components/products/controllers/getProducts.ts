import { Response } from "express";
import z from "zod";

import { IRequest } from "../../../utils/types";
import { asyncWrapper } from "../../../utils/helpers";
import { handleResponse } from "../../../utils/response";
import { prisma } from "../../../configs/persistence/database";
import { deleteProductSchema } from "../product.validations";

async function getProduct(req: IRequest, res: Response) {
  const { productId }: z.infer<typeof deleteProductSchema> = req.query;

  const { user } = req;
  let products;

  await asyncWrapper(async () => {
    if (productId) {
      products = await prisma.product.findFirst({
        where: { userId: user.id, id: productId },
      });

      if (!products) {
        return handleResponse({
          res,
          message: "this product does not exists",
          status: 400,
        });
      }
    } else {
      products = await prisma.product.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        skip: 0,
        take: 10,
        include: {
          user: {
            select: { firstName: true },
          },
        },
      });
    }

    return handleResponse({
      res,
      message: "product retrieved successfully",
      status: 200,
      data: products,
    });
  }, res);
}

export default getProduct;
