import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated)

const userController = new ProfileController();

profileRouter.get('/', userController.show);
profileRouter.put('/', userController.update);


export default profileRouter ;
