import { CartLog, sequelize } from "./sequelize";
import { Op } from "sequelize";

export const generateProductReportCartCount = async opts => {
  try {
    const report = CartLog.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: { $lte: `${opts.startDate}` }
          },
          { createdAt: { $gte: `${opts.endDate}` } }
        ]
      },
      attributes: [
        "productId",
        [sequelize.fn("sum", sequelize.col("cartCount")), "cartCount"]
      ],
      group: ["productId"],
      logging: true
    });

    return report;
  } catch (error) {
    return error;
  }
};
