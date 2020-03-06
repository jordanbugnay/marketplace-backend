import validate from "./cartRoutes.validation";
import errorCodes from "../lib/errorCodes";
import { upsertCartProduct, logCart } from "../database/cart";
import { product } from "../models";

export default app => {
  app.get("/cart/:id", (req, res) => {
    return res.send("cart data");
  });

  app.post("/cart", async (req, res) => {
    const { body = {} } = req;
    const payloadValidation = validate.postCart({ ...body });

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const result = await upsertCartProduct(body);

      if (!result.error) {
        logCart(body.productId);
      }

      return res.send(result);
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });
};
