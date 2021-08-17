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
        `https://api.github.com/users/${github_username}`,
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
    const { github_username, techs, latitude, longitude } = req.body;

    const dev = await Dev.findOne({ github_username });

    if (!dev) {
      return res.status(400).json({ error: 'User not exist' });
    }

    const apiResponse = await axios.get(
      `htttps://api.github.com/users/${github_username}`,
    );

    const techsArray = parseStringAsArray(techs);

    const { name = login, avatar_url, bio } = apiResponse.data;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const devNew = Dev.findByIdAndUpdate(
      { _id: dev._id },
      {
        name,
        avatar_url,
        bio,
        latitude,
        longitude,
        techs: techsArray,
        location,
      },
      { new: true },
    );

    return res.json(devNew);
  },

  async destroy(req, res) {
    const { github_username } = req.params;

    await Dev.deleteOne({ github_username });

    return res.status(200).json();
  },
};
