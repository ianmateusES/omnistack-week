import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.USER_DATABASE}:${process.env.PASSWORD_DATABASE}@universityproject.wqlng.mongodb.net/mapdev?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

app.use(express.json());
app.use(routes);

app.use(errors());

app.listen(3333, () => {
  console.log('🚀 Mapdev - Server started on port 3333');
});
