import sellerRoutes from "./sellerRoutes";
import productRoutes from "./productRoutes";
import search from "./search";
import cartRoutes from "./cartRoutes";
import userRoutes from "./userRoutes";
import reportRoutes from "./reportsRoutes";

import seeder from "./seeder";

export default app => {
  sellerRoutes(app);
  productRoutes(app);
  search(app);
  cartRoutes(app);
  userRoutes(app);
  reportRoutes(app);

  seeder(app);
};
