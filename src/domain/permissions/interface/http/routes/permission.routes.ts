import { Router } from 'express';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import { PermissionsController } from '../controllers/permissionsController';
import checkUserRoles from '../../../../user/interface/http/middlewares/checkUserRoles';

const permissionsRouter = Router();

const permissionController = new PermissionsController();

permissionsRouter.post('/', ensureAuthenticated, checkUserRoles(['ADMIN']), permissionController.create);
permissionsRouter.get('/', ensureAuthenticated, permissionController.index);

export default permissionsRouter ;
