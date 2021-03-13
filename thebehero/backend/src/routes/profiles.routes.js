import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

// http://localhost:3333/profile
profileRouter.get('/', ProfileController.index);

export default profileRouter;
