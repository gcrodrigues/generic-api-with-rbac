import { Router } from 'express';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import { RoleController } from '../controllers/roleController';
import checkPermissions from '../../../../permissions/interface/http/middlewares/checkPermissions';
import { RolePermissions } from '../../../permissions/rolePermissions';

const rolesRouter = Router();

const roleController = new RoleController();

rolesRouter.get('/', ensureAuthenticated, checkPermissions([RolePermissions.LIST_ALL_ROLES]), roleController.index);
rolesRouter.post('/', ensureAuthenticated, checkPermissions([RolePermissions.CREATE_ROLE]), roleController.create);
rolesRouter.patch('/permissions', ensureAuthenticated, checkPermissions([RolePermissions.UPDATE_ROLE_PERMISSIONS]), roleController.updatePermissions);

export default rolesRouter ;
