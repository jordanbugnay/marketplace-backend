module.exports = (sequelize, type) => {
  return sequelize.define("productSeller", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: type.INTEGER,
    sellerId: type.INTEGER,
    quantity: type.INTEGER
  });
};
