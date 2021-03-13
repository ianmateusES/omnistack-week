import { Router } from 'express';
import ongsRouter from './ongs.routes';
import incidentsRouter from './incidents.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/ongs', ongsRouter);
routes.use('/incidents', incidentsRouter);
routes.use('/profile', ongsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
