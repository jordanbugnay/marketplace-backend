import faker from "faker";
import {
  bulkInsertSellers,
  clearSellers,
  listSellers
} from "../database/seller";
import {
  bulkInsertProducts,
  clearProducts,
  listProducts
} from "../database/product";

import { bulkIndex } from "../elasticsearch";

export default app => {
  app.get("/seed", async (req, res) => {
    const sellers = [];

    for (let x = 0; x < 50; x++) {
      sellers.push({
        email: faker.internet.email(),
        name: faker.name.findName()
      });
    }
    await clearSellers();
    await bulkInsertSellers(sellers);
    const dbSellers = await listSellers();

    const min = dbSellers[0].id;
    const max = dbSellers[dbSellers.length - 1].id;

    const products = [];

    for (let x = 0; x < 300; x++) {
      products.push({
        sellerId: Math.floor(min + Math.random() * (max + 1 - min)),
        name: faker.commerce.product(),
        description: faker.lorem.sentences(),
        quantity: faker.random.number(),
        price: faker.random.number()
      });
    }

    await clearProducts();
    await bulkInsertProducts(products);
    const dbProducts = await listProducts();

    const elasticProducts = [];
    dbProducts.forEach(product => {
      elasticProducts.push({
        index: { _index: "products", _type: "doc", _id: product.id }
      });
      elasticProducts.push(product.dataValues);
    });

    bulkIndex(elasticProducts);

    return res.send("ok");
  });
};
