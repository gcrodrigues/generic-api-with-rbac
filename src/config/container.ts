import '../domain/auth/providers'
import '../shared/container/providers'
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import IUserRepository from '../domain/user/repositories/userRepository';
import PrismaUserQueries from '../infra/prisma/queries/user';
import UserTokensRepository from '../infra/prisma/queries/userToken';
import IUserTokensRepository from '../domain/user/repositories/userTokensRepository';
import RolesRepository from '../infra/prisma/queries/roles';
import IRolesRepository from '../domain/roles/repositories/rolesRepository';
import IPermissionsRepository from '../domain/permissions/repositories/permissionsRepository';
import PermissionsRepository from '../infra/prisma/queries/permissions';


container.registerSingleton<IUserRepository>('UserRepository', PrismaUserQueries);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository);
container.registerSingleton<IPermissionsRepository>('PermissionsRepository', PermissionsRepository);
container.register<PrismaClient>("PrismaClient", {
  useValue: new PrismaClient(),
});

