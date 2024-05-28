import { Response } from "express";
import z from "zod";

import { IRequest } from "../../../utils/types";
import { asyncWrapper } from "../../../utils/helpers";
import { handleResponse } from "../../../utils/response";
import { prisma } from "../../../configs/persistence/database";
import { createProductSchema } from "../product.validations";

async function createProduct(req: IRequest, res: Response) {
  const {
    name,
    description,
    price,
    quantityInStock,
    sku,
  }: z.infer<typeof createProductSchema> = req.body;

  const { user } = req;
  await asyncWrapper(async () => {
    let product;

    product = await prisma.product.findFirst({ where: { sku, name } });
    if (product)
      handleResponse({ res, status: 400, message: "product already exist" });

    product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        quantityInStock,
        sku,
        userId: user.id,
      },
    });

    return handleResponse({ res, data: product, message: "successful" });
  }, res);
}

export default createProduct;
