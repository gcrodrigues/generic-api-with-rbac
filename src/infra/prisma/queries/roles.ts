
import { PrismaClient, Roles } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IRolesRepository from '../../../domain/roles/repositories/rolesRepository';

@injectable()
class RolesRepository implements IRolesRepository {
  constructor( 
    @inject("PrismaClient") private prisma: PrismaClient
  ) {
  }

  public async getByUserId(user_id: string): Promise<Roles[]> {
    const roles = await this.prisma.roles.findMany({
      where: {
        users: {
          some: {
            id: user_id
          }
        }
      }
    })

    return roles
  }
}

export default RolesRepository;
