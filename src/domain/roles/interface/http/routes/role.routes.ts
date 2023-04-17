import { Router } from 'express';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import { RoleController } from '../controllers/roleController';

const rolesRouter = Router();

const roleController = new RoleController();

rolesRouter.post('/', ensureAuthenticated, roleController.create);
rolesRouter.patch('/permissions', ensureAuthenticated, roleController.updatePermissions);

export default rolesRouter ;
