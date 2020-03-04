import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../database/product';
import errorCodes from '../lib/errorCodes';
import validate from './productRoutes.validate';

const ID_DOES_NOT_EXIST = 'id does not exist';

export default app => {
  // TODO: pagination, filtering, sorting
  app.get('/products', async (req, res) => res.send(await listProducts()));

  app.get('/product/:id', async (req, res) => {
    const params = req.params;
    const payloadValidation = validate.getProduct(params);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { id = 0 } = params;
    const product = await getProduct(id);

    if (!product) {
      return res.send(
        errorCodes.notFound({ message: 'Product does not exist' })
      );
    }
    return res.send(product);
  });

  app.post('/seller/:sellerId/product', async (req, res) => {
    const { body = {}, params = {} } = req;
    const payloadValidation = validate.postProduct({ ...body, ...params });

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const product = await createProduct({ ...body, ...params });

      return res.send(product.details);
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });

  app.put('/product', async (req, res) => {
    const { body = {} } = req;
    const payloadValidation = validate.putProduct(body);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const product = await updateProduct(body);
      if (product && !product[0]) {
        return res.send(
          errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
        );
      }

      return res.send('Update success');
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });

  app.delete('/product', async (req, res) => {
    const { body = {} } = req;

    const payloadValidation = validate.deleteProduct(body);
    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { id = 0 } = body;

    const product = await deleteProduct(id);

    if (!product) {
      return res.send(
        errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
      );
    }

    return res.send('Product deleted');
  });
};
