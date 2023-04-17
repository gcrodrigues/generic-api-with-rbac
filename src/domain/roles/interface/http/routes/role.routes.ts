import { Router } from 'express';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import { RoleController } from '../controllers/roleController';

const rolesRouter = Router();

const roleController = new RoleController();

rolesRouter.post('/', ensureAuthenticated, roleController.create);

export default rolesRouter ;
