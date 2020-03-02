import express from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
import { Seller } from "./database/sequelize";

// console.log(syncSequelize());
// const rds = new AWS.RDS({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });
// Seller.create({ name: "jordan" });
// Seller.findAll()
//   .then(books => console.log(books))
//   .catch(e => console.log(e));

const app = express();
const port = process.env.PORT;

import routes from "./routes";
console.log(routes(app));

app.get("/", (req, res) => res.send("Server is alive!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
