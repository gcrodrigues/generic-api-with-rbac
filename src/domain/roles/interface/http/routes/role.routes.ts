import { Router } from 'express';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import { RoleController } from '../controllers/roleController';
import checkPermissions from '../../../../permissions/interface/http/middlewares/checkPermissions';

const rolesRouter = Router();

const roleController = new RoleController();

rolesRouter.get('/', ensureAuthenticated, roleController.index);
rolesRouter.post('/', ensureAuthenticated, roleController.create);
rolesRouter.patch('/permissions', ensureAuthenticated, roleController.updatePermissions);

export default rolesRouter ;
