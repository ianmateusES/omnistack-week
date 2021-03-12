import axios from 'axios';
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

export default {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ name: github_username });
    if (!dev) {
      const apiResponse = await axios.get(
        `htttps://api.github.com/users/${github_username}`
      );

      const techsArray = parseStringAsArray(techs);

      const { name = login, avatar_url, bio } = apiResponse.data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        name,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, avatar_url, bio, latitude, longitude, techs } = req.body;

    const techsArray = parseStringAsArray(techs);

    const dev = Dev.findByIdAndUpdate(
      { _id: id },
      { name, avatar_url, bio, latitude, longitude, techs: techsArray },
      { new: true }
    );

    return res.json(dev);
  },

  async destroy(req, res) {
    const { id } = req.params;

    await Dev.deleteOne(id);

    return res.status(200).json();
  },
};
