import { Seller } from "../database/sequelize";

export default app => {
  app.get("/sellers", (req, res) => {
    Seller.findAll().then(sellers => res.send(sellers));
  });
};
