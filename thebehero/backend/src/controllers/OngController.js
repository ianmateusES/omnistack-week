import crypto from 'crypto';
import connection from '../database/connection';

export default {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  async store(req, res) {
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({ id, ...req.body });

    return res.json({ id });
  },
};
