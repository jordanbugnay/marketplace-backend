import { Seller } from "./sequelize";
import { Op } from "sequelize";

export const listSellers = async opts => {
  const { limit, sort, filter, offset } = opts;
  return await Seller.findAll({
    limit,
    order: [sort],
    offset,
    attributes: filter ? JSON.parse(filter) : false
  });
};

export const getSeller = async id => await Seller.findOne({ where: { id } });

export const createSeller = async data => {
  const { name, email } = data;
  const [user, created] = await Seller.findOrCreate({
    where: { email },
    defaults: { name, email }
  });

  return { user, created };
};

export const updateSeller = async data => {
  const { id, opts } = data;

  const seller = await Seller.update(opts, { where: { id } });

  return seller;
};

export const deleteSeller = async id => await Seller.destroy({ where: { id } });

// dev
export const bulkInsertSellers = async sellers =>
  await Seller.bulkCreate(sellers);
export const clearSellers = async () =>
  await Seller.destroy({ where: { id: { [Op.not]: 0 } } });
