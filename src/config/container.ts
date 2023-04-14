import '../domain/auth/providers'
import '../shared/container/providers'
import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import IUserRepository from '../domain/user/repositories/userRepository';
import PrismaUserQueries from '../infra/prisma/queries/user';
import UserTokensRepository from '../infra/prisma/queries/userToken';
import IUserTokensRepository from '../domain/user/repositories/userTokensRepository';

container.registerSingleton<IUserRepository>('UserRepository', PrismaUserQueries);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
container.register<PrismaClient>("PrismaClient", {
  useValue: new PrismaClient(),
});


