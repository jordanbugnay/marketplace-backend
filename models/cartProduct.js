module.exports = (sequelize, type) => {
  return sequelize.define("cartProduct", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cartId: { type: type.INTEGER, unique: "compositeIndex" },
    productId: { type: type.INTEGER, unique: "compositeIndex" },
    quantity: type.INTEGER
  });
};
