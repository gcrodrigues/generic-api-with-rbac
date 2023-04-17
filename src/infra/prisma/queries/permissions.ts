
import { Permissions, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IPermissionsRepository from '../../../domain/permissions/repositories/permissionsRepository';
import { CreatePermissionDto } from '../../../domain/permissions/dtos/createPermission.dto';

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

  public async getByUserId(user_id: string): Promise<Permissions[]> {
    const permissions = await this.prisma.permissions.findMany({
      where: {
        roles: {
          some: {
            users: { 
              some: {
                id: user_id
              }
            }
          }
        }   
      }
    })

    return permissions
  }

  public async create(permission: CreatePermissionDto): Promise<Permissions> {
    const createdPermission = await this.prisma.permissions.create({
      data: {
        action: permission.action,
        resource: permission.resource,
      }
    })

    return createdPermission
  }

  public async findByActionAndResource(permission: CreatePermissionDto): Promise<Permissions | null> {
    return await this.prisma.permissions.findFirst({
      where: {
        action: {
          equals:  permission.action,
          mode: 'insensitive'
        },
        resource: {
          equals: permission.resource,
          mode: 'insensitive'
        },
      }
    })
  }
}

export default PermissionsRepository;
