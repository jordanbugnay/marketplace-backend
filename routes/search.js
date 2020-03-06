import { client } from "../elasticsearch";

export default app => {
  app.get("/search", async (req, res) => {
    const { query = {} } = req;
    const { q = "", type = "match" } = query;
    const queryBody = {
      query: {
        bool: {
          should: [
            {
              [type]: {
                name: q
              }
            },
            {
              [type]: {
                description: q
              }
            }
          ]
        }
      }
    };

    const result = await client.search({
      index: "products",
      body: {
        ...queryBody
      }
    });
    return res.send(result);
  });
};
