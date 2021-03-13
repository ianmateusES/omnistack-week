import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();

// http://localhost:3333/sessions
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  SessionController.store,
);

export default sessionsRouter;
