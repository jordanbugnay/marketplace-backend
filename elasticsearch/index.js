import dotenv from "dotenv";
dotenv.config();
const elasticsearch = require("elasticsearch");
const config = require("./config.json");

const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_URI
});

const deleteDocument = async indexName => {
  try {
    return await client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          match_all: {}
        }
      }
    });
  } catch (err) {
    console.log(`[ERROR] ${err}`);

    throw err;
  }
};

const bulkIndex = async dataToBeIndexed => {
  try {
    const created = await client.bulk({
      body: dataToBeIndexed
    });

    console.log(`[LOG] item indexed: ${created.items.length}`);

    return created.items.length;
  } catch (err) {
    console.log(`[ERROR] ${err}`);

    throw err;
  }
};

module.exports = {
  deleteDocument,
  bulkIndex,
  client,
  config
};
