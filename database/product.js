import { Product } from './sequelize';

export const listProducts = async () => await Product.findAll();

export const getProduct = async id => await Product.findOne({ where: { id } });

export const createProduct = async data => {
  const { name, description, quantity, price, sellerId } = data;
  const [details, created] = await Product.findOrCreate({
    where: { name, price },
    defaults: { name, description, quantity, price, sellerId },
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
