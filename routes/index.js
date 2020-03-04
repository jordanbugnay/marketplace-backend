import sellerRoutes from './sellerRoutes';
import productRoutes from './productRoutes';

export default app => {
  sellerRoutes(app);
  productRoutes(app);
};
