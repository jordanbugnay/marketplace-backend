module.exports = (sequelize, type) => {
  return sequelize.define('product', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    description: type.TEXT,
    quantity: type.INTEGER,
    price: type.INTEGER,
  });
};
