module.exports = (sequelize, type) => {
  return sequelize.define(
    "cartLog",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: { type: type.INTEGER, unique: "productUniqueIndex" },
      cartCount: { type: type.INTEGER, defaultValue: 1 },
      createdAt: { type: type.DATE, unique: "productUniqueIndex" }
    },
    { timestamps: false }
  );
};
