import 'dotenv/config';
import './database/mongodb'
import express from 'express';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

export default app;
