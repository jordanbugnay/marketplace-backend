const Sequelize = require('sequelize');

// const CartModel = require("./models/cart");
const SellerModel = require('../models/seller');
const ProductModel = require('../models/product');

import {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT,
  DATABASE_PORT,
} from '../config';

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DIALECT,
    port: DATABASE_PORT,
    logging: false,
  }
);

const Seller = SellerModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
Seller.hasMany(Product);

sequelize
  .sync({ force: false })
  .then(() => {
    return console.log(`Database & tables created here!`);
  })
  .catch(err => console.log(err));

module.exports = {
  Seller,
  Product,
};
