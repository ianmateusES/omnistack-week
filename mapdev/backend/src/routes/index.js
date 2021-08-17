import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import DevController from '../controllers/DevController';
import SearchController from '../controllers/SearchController';

const routes = Router();

routes.get('/devs', DevController.index);

routes.post(
  '/devs',
  celebrate({
    [Segments.BODY]: {
      github_username: Joi.string().required(),
      techs: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  DevController.store,
);

routes.get(
  '/search',
  celebrate({
    [Segments.QUERY]: {
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      techs: Joi.string().required(),
    },
  }),
  SearchController.index,
);

export default routes;
