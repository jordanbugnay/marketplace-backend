import { CartLog, CartProduct, Product, sequelize } from "./sequelize";
import _sequelize from "sequelize";
import { getCurrentDate } from "../lib/date";

export const upsertCartProduct = async data => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const product = await Product.findOne(
      { where: { id: data.productId } },
      transaction
    );
    if (data.quantity > product.dataValues.quantity) {
      transaction.rollback();
      return { error: 1, message: "Not enough stock" };
    }

    if (!product.dataValues.quantity) {
      transaction.rollback();
      return { error: 1, message: "Out of stock" };
    }

    const { id, productId, quantity } = data;
    await CartProduct.upsert({ cartId: id, productId, quantity });

    await transaction.commit();

    return { error: 0, message: "Success" };
  } catch (error) {
    return { error: 1, message: error };
  }
};

export const logCart = async productId => {
  try {
    const log = await CartLog.findOne({
      where: { productId, createdAt: getCurrentDate() }
    });
    if (log) {
      await CartLog.update(
        { cartCount: log.cartCount + 1 },
        { where: { productId, createdAt: getCurrentDate() } }
      );
    } else {
      await CartLog.create({
        productId,
        createdAt: getCurrentDate()
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// dev
// export const bulkInsertProducts = async products =>
//   await Product.bulkCreate(products);
// export const clearProducts = async () =>
//   await Product.destroy({ where: { id: { [Op.not]: 0 } } });
