import mongoose from 'mongoose';

mongoose.connect(
  `mongodb+srv://${process.env.USER_DATABASE}:${process.env.PASSWORD_DATABASE}@universityproject.wqlng.mongodb.net/mapdev?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
);
