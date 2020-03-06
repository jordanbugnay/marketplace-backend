import { Product } from "./sequelize";
import { Op } from "sequelize";

export const listProducts = async opts => {
  const { limit, sort, filter, offset } = opts;
  console.log(filter);
  return await Product.findAll({
    limit,
    order: [sort],
    offset,
    attributes: filter ? JSON.parse(filter) : false
  });
};

export const getProduct = async id => await Product.findOne({ where: { id } });

export const createProduct = async data => {
  const { name, description, quantity, price, sellerId } = data;
  const [details, created] = await Product.findOrCreate({
    where: { name, price },
    defaults: { name, description, quantity, price, sellerId }
  });

  return { details, created };
};

export const updateProduct = async data => {
  const { id, opts } = data;

  const product = await Product.update(opts, { where: { id } });

  return product;
};

export const deleteProduct = async id =>
  await Product.destroy({ where: { id } });

// dev
export const bulkInsertProducts = async products =>
  await Product.bulkCreate(products);
export const clearProducts = async () =>
  await Product.destroy({ where: { id: { [Op.not]: 0 } } });
