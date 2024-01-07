
import { PrismaClient, Roles } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IRolesRepository from '../../../domain/roles/repositories/rolesRepository';
import { CreateRoleDto } from '../../../domain/roles/dtos/createRole.dto';
import { UpdateRolePermissionsDto } from '../../../domain/roles/dtos/updateRolePermissions';

@injectable()
class RolesRepository implements IRolesRepository {
  constructor( 
    @inject("PrismaClient") private prisma: PrismaClient
  ) {
  }

  async create(role: CreateRoleDto): Promise<Roles> {
    const createdRole = await this.prisma.roles.create({
      data: {
        name: role.name,
        permissions: {
          connect: role.permissions.map(id => ({ id: id}))
        }
      },
      include: {
        permissions: true
      }
    })

    return createdRole
  }

  async findByName(name: string): Promise<Roles | null> {
    const role = await this.prisma.roles.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        },
      },
    })

    return role
  }

  async deactivate(id: string) {
    const deletedRole = await this.prisma.roles.delete({
      where: {
        id,
      },
    })

    return deletedRole
  }

  async findById(role_id: string): Promise<Roles | null> {
    const role = await this.prisma.roles.findFirst({ where: { id: role_id} })
    return role
  }


  public async getByUserId(user_id: string): Promise<Roles[]> {
    const roles = await this.prisma.roles.findMany({
      where: {
        users: {
          some: {
            id: user_id
          }
        }
      }, 
      include: {
        permissions: true
      }
    })

    return roles
  }

  public async findAll(): Promise<Roles[]> {
    const roles = await this.prisma.roles.findMany()

    return roles
  }

  public async updatePermissions(role: UpdateRolePermissionsDto): Promise<Roles> {
    const permissions = await this.prisma.permissions.findMany({
      where: {
        roles:{
          some: {
            id: role.id
          } 
        }
      },
      select: {
        id: true
      }
    })

    const combinedPermissions = role.permissions.concat(permissions.map(p => p.id));
    const newPermissions = combinedPermissions.filter((permission, index) => {
      return combinedPermissions.indexOf(permission) === index && role.permissions.includes(permission);
    });

    const roles = await this.prisma.roles.update({
      where: {
        id: role.id
      },
      data: {
        permissions: {
          disconnect: permissions.map(id => id),
          connect: newPermissions.map(id => ({ id: id}))
        }
      },
      include: {
        permissions: true
      }
    })

    return roles
  }


  public async findPermissionsByRoleId(role_id: string) {
    const role = await this.prisma.roles.findUnique({
      where: {
        id: role_id
      }, 
      include: {
        permissions: true
      }
    })

    return role?.permissions
  }
}

export default RolesRepository;
