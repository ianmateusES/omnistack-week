import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OngController from '../controllers/OngController';

const ongsRouter = Router();

// http://localhost:3333/ongs
ongsRouter.get('/', OngController.index);

ongsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().max(2).required(),
    },
  }),
  OngController.store,
);

export default ongsRouter;
