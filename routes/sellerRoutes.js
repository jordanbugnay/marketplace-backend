import { Seller } from '../database/sequelize';
import errorCodes from '../lib/errorCodes';
import validate from './sellerRoutes.validate';

const ID_DOES_NOT_EXIST = 'id does not exist';

export default app => {
  app.get('/seller/list', (req, res) => {
    Seller.findAll().then(sellers => res.send(sellers));
  });

  app.get('/seller', (req, res) => {
    const body = req.query;
    const payloadValidation = validate.getSeller(body);

    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { id = 0 } = body;

    Seller.findOne({ where: { id } }).then(seller => {
      if (!seller) {
        return res.send(
          errorCodes.notFound({ message: 'User does not exist' })
        );
      }
      return res.send(seller);
    });
  });

  app.post('/seller', (req, res) => {
    const { name = null, email = null } = req.body;

    Seller.findOrCreate({ where: { email }, defaults: { name, email } })
      .then(([user, created]) => {
        if (!created) {
          return res.send(
            errorCodes.duplicateResource({
              message: 'Seller email already exists.',
            })
          );
        }

        return res.send(user);
      })
      .catch(error => {
        return res.send(errorCodes.badRequest({ message: error }));
      });
  });

  app.put('/seller', async (req, res) => {
    const { opts = {}, id = 0 } = req.body;

    const updateSeller = await Seller.update(opts, { where: { id } });
    if (updateSeller && !updateSeller[0]) {
      return res.send(
        errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
      );
    }

    return res.send('Update success');
  });

  app.delete('/seller', async (req, res) => {
    const { id = 0 } = req.body;

    const deleteSeller = await Seller.destroy({ where: { id } });

    if (!deleteSeller) {
      return res.send(
        errorCodes.unprocessableEntity({ message: ID_DOES_NOT_EXIST })
      );
    }

    return res.send('Seller deleted');
  });
};
