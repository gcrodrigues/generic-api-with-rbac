import { Router } from 'express';

import ForgotPasswordCotnroller from '../controllers/forgotPasswordController';
import ResetPasswordController from '../controllers/resetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordCotnroller();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.patch('/reset', resetPasswordController.create);

export default passwordRouter;