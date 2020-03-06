import { User, Cart } from "./sequelize";
import { Op } from "sequelize";

export const listUsers = async () => await User.findAll();

export const getUser = async id => await User.findOne({ where: { id } });

export const createUser = async data => {
  const { name, email } = data;
  const [details, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, email }
  });

  await Cart.findOrCreate({
    where: { userId: details.id },
    defaults: { userId: details.id }
  });

  return { details, created };
};

export const updateUser = async data => {
  const { id, opts } = data;

  const user = await User.update(opts, { where: { id } });

  return user;
};

export const deleteUser = async id => await User.destroy({ where: { id } });

// dev
export const bulkInsertUsers = async users => await User.bulkCreate(users);
export const clearUsers = async () =>
  await User.destroy({ where: { id: { [Op.not]: 0 } } });
