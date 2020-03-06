module.exports = (sequelize, type) => {
  return sequelize.define("cart", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: type.INTEGER
  });
};
