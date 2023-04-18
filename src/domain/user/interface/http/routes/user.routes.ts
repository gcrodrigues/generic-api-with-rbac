import { Router } from 'express';
import { UserController } from '../controllers/userController';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import checkPermissions from '../../../../permissions/interface/http/middlewares/checkPermissions';
import { UserPermissions } from '../../../permissions/userPermissions';

const usersRouter = Router();

const userController = new UserController();

usersRouter.delete('/deactivate', ensureAuthenticated, checkPermissions([UserPermissions.DELETE_USER]), userController.deactivate);
usersRouter.post('/', userController.create);
usersRouter.put('/', ensureAuthenticated, checkPermissions([UserPermissions.UPDATE_USER]), userController.update);

export default usersRouter ;
