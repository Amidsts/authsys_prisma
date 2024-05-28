import { Response } from "express";
import z from "zod";

import { IRequest } from "../../../utils/types";
import { asyncWrapper } from "../../../utils/helpers";
import { handleResponse } from "../../../utils/response";
import { prisma } from "../../../configs/persistence/database";
import { deleteProductSchema } from "../product.validations";

async function deleteProduct(req: IRequest, res: Response) {
  const { productId }: z.infer<typeof deleteProductSchema> = req.params;

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

    await prisma.product.delete({
      where: { id: productId, userId: user.id },
    });

    return handleResponse({ res, message: "product deleted successfully" });
  }, res);
}

export default deleteProduct;
