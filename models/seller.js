module.exports = (sequelize, type) => {
  return sequelize.define("seller", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING
  });
};
