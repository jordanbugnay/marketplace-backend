import validate from "./reportsRoutes.validate";
import errorCodes from "../lib/errorCodes";
import { getCurrentDate } from "../lib/date";
import { generateProductReportCartCount } from "../database/reports";

export default app => {
  app.get("/reports/product/cartCount", async (req, res) => {
    const { query = {} } = req;
    const payloadValidation = validate.getReportsProductCartCount(query);
    if (payloadValidation.error) {
      return res.send(
        errorCodes.badRequest({ message: payloadValidation.error })
      );
    }

    const { startDate = getCurrentDate(), endDate = getCurrentDate() } = query;

    try {
      const report = await generateProductReportCartCount({
        startDate,
        endDate
      });
      res.send(report);
    } catch (error) {
      return res.send(errorCodes.badRequest({ message: error }));
    }
  });
};
