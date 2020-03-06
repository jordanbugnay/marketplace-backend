const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

import SellerModel from "../models/seller";
import ProductModel from "../models/product";
import CartModel from "../models/cart";
import UserModel from "../models/user";
import CartProductModel from "../models/cartProduct";
import CartLogModel from "../models/cartLog";

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT,
  DATABASE_PORT
} = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DIALECT,
    port: DATABASE_PORT,
    logging: false
  }
);

const Seller = SellerModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
Seller.hasMany(Product);

const User = UserModel(sequelize, Sequelize);
const Cart = CartModel(sequelize, Sequelize);
User.hasOne(Cart);

const CartProduct = CartProductModel(sequelize, Sequelize);
Cart.hasMany(CartProduct);
Product.hasMany(CartProduct);

const CartLog = CartLogModel(sequelize, Sequelize);

sequelize
  .sync({ force: false })
  .then(() => {
    return console.log(`Database & tables created here!`);
  })
  .catch(err => console.log(err));

module.exports = {
  Seller,
  Product,
  User,
  Cart,
  CartProduct,
  sequelize,
  CartLog
};
