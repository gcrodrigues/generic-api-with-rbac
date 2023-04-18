import { Router } from 'express';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import { PermissionsController } from '../controllers/permissionsController';
import checkUserRoles from '../../../../user/interface/http/middlewares/checkUserRoles';
import checkPermissions from '../middlewares/checkPermissions';
import { Permissions } from '../../../permissions/permissions';

const permissionsRouter = Router();

const permissionController = new PermissionsController();

permissionsRouter.post('/', ensureAuthenticated, checkUserRoles(['Admin']), permissionController.create);
permissionsRouter.get('/', ensureAuthenticated, checkPermissions([Permissions.LIST_ALL_PERMISSIONS]), permissionController.index);

export default permissionsRouter ;
