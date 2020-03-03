import {
  listSellers,
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
} from '../database/seller';
import errorCodes from '../lib/errorCodes';
import validate from './sellerRoutes.validate';

const ID_DOES_NOT_EXIST = 'id does not exist';

export default app => {
  app.get('/seller/list', async (req, res) => res.send(await listSellers()));

  app.get('/seller', async (req, res) => {
    const queryString = req.query;
    const payloadValidation = validate.getSeller(queryString);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { id = 0 } = queryString;
    const seller = await getSeller(id);

    if (!seller) {
      return res.send(errorCodes.notFound({ message: 'User does not exist' }));
    }
    return res.send(seller);
  });

  app.post('/seller', async (req, res) => {
    const { body = {} } = req;
    const payloadValidation = validate.postSeller(body);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const seller = await createSeller(body);

      if (!seller.created) {
        return res.send(
          errorCodes.duplicateResource({
            message: 'Seller email already exists.',
          })
        );
      }

      return res.send(seller.user);
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });

  app.put('/seller', async (req, res) => {
    const { body = {} } = req;
    const payloadValidation = validate.putSeller(body);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    try {
      const seller = await updateSeller(body);
      if (seller && !seller[0]) {
        return res.send(
          errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
        );
      }

      return res.send('Update success');
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });

  app.delete('/seller', async (req, res) => {
    const { body = {} } = req;

    const payloadValidation = validate.deleteSeller(body);
    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { id = 0 } = body;

    const seller = await deleteSeller(id);

    if (!seller) {
      return res.send(
        errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
      );
    }

    return res.send('Seller deleted');
  });
};
