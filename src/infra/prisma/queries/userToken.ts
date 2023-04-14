
import { PrismaClient, UserToken } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IUserTokensRepository from '../../../domain/user/repositories/userTokensRepository';

@injectable()
class UserTokensRepository implements IUserTokensRepository {
  constructor( @inject("PrismaClient") private prisma: PrismaClient) {
  }

  public async findByToken(token: string) {
    const userToken = await this.prisma.userToken.findFirst({ where: { token } })
    return userToken;
  }

  public async generate(userId: string){
    const userToken = await this.prisma.userToken.create({
      data: { userId }
    });

    return userToken;
  }
}

export default UserTokensRepository;
