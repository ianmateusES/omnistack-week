import mongoose from 'mongoose';
import PointSchema from './utils/PointSchema';

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: {
    type: String,
    unique: true,
  },
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

export default mongoose.model('Dev', DevSchema);
