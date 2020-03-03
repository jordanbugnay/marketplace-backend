import { Seller } from './sequelize';

export const listSellers = async () => await Seller.findAll();

export const getSeller = async id => await Seller.findOne({ where: { id } });

export const createSeller = async data => {
  const { name, email } = data;
  const [user, created] = await Seller.findOrCreate({
    where: { email },
    defaults: { name, email },
  });

  return { user, created };
};

export const updateSeller = async data => {
  const { id, opts } = data;

  const seller = await Seller.update(opts, { where: { id } });

  return seller;
};

export const deleteSeller = async id => await Seller.destroy({ where: { id } });
