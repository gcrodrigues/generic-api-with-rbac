
import { Permissions, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IPermissionsRepository from '../../../domain/permissions/repositories/permissionsRepository';

@injectable()
class PermissionsRepository implements IPermissionsRepository {
  constructor( 
    @inject("PrismaClient") private prisma: PrismaClient
  ) {
  }

  public async getByRoleId(role_id: string): Promise<Permissions[]> {
    const permissions = await this.prisma.permissions.findMany({
      where: {
        roles: {
          every: {
            id: role_id
          }
        }
      }
    })

    return permissions
  }
}

export default PermissionsRepository;
