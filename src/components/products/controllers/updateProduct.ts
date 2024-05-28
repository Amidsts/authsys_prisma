import { Response } from "express";
import z from "zod";

import { IRequest } from "../../../utils/types";
import { asyncWrapper } from "../../../utils/helpers";
import { handleResponse } from "../../../utils/response";
import { prisma } from "../../../configs/persistence/database";
import { updateProductSchema } from "../product.validations";

async function updateProduct(req: IRequest, res: Response) {
  const {
    productId,
    name,
    description,
    price,
    quantityInStock,
    sku,
  }: z.infer<typeof updateProductSchema> = req.body;

  const { user } = req;
  await asyncWrapper(async () => {
    const productExists = await prisma.product.findFirst({
      where: { userId: user.id, id: productId },
    });
    if (!productExists) {
      return handleResponse({
        res,
        message: "this product does not exists",
        status: 400,
      });
    }

    const product = await prisma.product.update({
      where: { id: productId, userId: user.id },
      data: {
        name,
        description,
        price,
        quantityInStock,
        sku,
      },
    });

    return handleResponse({ res, data: product, message: "successful" });
  }, res);
}

export default updateProduct;
