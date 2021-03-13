import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import IncidentsController from '../controllers/IncidentController';

const incidentsRouter = Router();

// http://localhost:3333/incidents
incidentsRouter.get('/', IncidentsController.index);

incidentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  IncidentsController.store,
);

incidentsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  IncidentsController.destroy,
);

export default incidentsRouter;
