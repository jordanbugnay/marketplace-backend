import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import { init } from './elasticsearch/init';

init().catch(err => {
  console.log(err);
});

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import routes from './routes';
routes(app);

app.get('/', (req, res) => res.send('Server is alive!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
