
import { PrismaClient, Roles } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IRolesRepository from '../../../domain/roles/repositories/rolesRepository';
import { CreateRoleDto } from '../../../domain/roles/dtos/createRole.dto';

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
