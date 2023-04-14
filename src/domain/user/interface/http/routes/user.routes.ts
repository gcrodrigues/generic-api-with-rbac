import { Router } from 'express';
import { UserController } from '../controllers/userController';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';

const usersRouter = Router();

const userController = new UserController();

usersRouter.delete('/deactivate', ensureAuthenticated, userController.deactivate);
usersRouter.post('/', userController.create);

export default usersRouter ;
