const Sequelize = require("sequelize");

// const CartModel = require("./models/cart");
const SellerModel = require("../models/seller");
const ProductModel = require("../models/product");

import {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT,
  DATABASE_PORT
} from "../config";

console.log({
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT,
  DATABASE_PORT
});
const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DIALECT,
    port: DATABASE_PORT
  }
);

const Seller = SellerModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
// Author has Many to book
Seller.hasMany(Product);

sequelize
  .sync({ force: false })
  .then(() => {
    return console.log(`Database & tables created here!`);
  })
  .catch(err => console.log(err));

// const syncSequelize = () => {
//   try {
//     sequelize
//       .sync({ force: false })
//       .then(() => {
//         return console.log(`Database & tables created here!`);
//       })
//       .catch(err => console.log(err));
//     sequelize
//       .authenticate()
//       .then(() => {
//         console.log("Connection has been established successfully.");
//       })
//       .catch(err => {
//         console.error("Unable to connect to the database:", err);
//       });
//   } catch (error) {
//     console.log("error");
//   }
// };

module.exports = {
  Seller,
  Product
};
