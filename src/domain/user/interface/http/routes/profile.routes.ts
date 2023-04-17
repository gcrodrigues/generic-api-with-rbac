import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';
import ensureAuthenticated from '../../../../auth/interface/http/middlewares/ensureAuthenticated';
import checkUserRoles from '../middlewares/checkUserRoles';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated)

const profileController = new ProfileController();

profileRouter.delete('/deactivate', ensureAuthenticated, profileController.deactivate);
profileRouter.get('/', ensureAuthenticated, profileController.show);
profileRouter.put('/', ensureAuthenticated, profileController.update);


export default profileRouter ;
