import { Router } from 'express';
import profileRouter from '../../../domain/user/interface/http/routes/profile.routes';
import usersRouter from '../../../domain/user/interface/http/routes/user.routes';
import authRouter from '../../../domain/auth/interface/http/routes/auth.routes';
import passwordRouter from '../../../domain/user/interface/http/routes/password.routes';
import rolesRouter from '../../../domain/roles/interface/http/routes/role.routes';
import permissionsRouter from '../../../domain/permissions/interface/http/routes/permission.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/auth', authRouter);
routes.use('/roles', rolesRouter);
routes.use('/permissions', permissionsRouter);

export default routes;
