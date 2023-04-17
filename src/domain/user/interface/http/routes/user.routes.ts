import { Router } from 'express';
import { UserController } from '../controllers/userController';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import checkPermissions from '../../../../permissions/interface/http/middlewares/checkPermissions';

const usersRouter = Router();

const userController = new UserController();

usersRouter.delete('/deactivate', ensureAuthenticated, checkPermissions(['users:delete']), userController.deactivate);
usersRouter.post('/', userController.create);

export default usersRouter ;
