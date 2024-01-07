import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ChangePasswordDto } from '../../../domain/user/dtos/changePassword.dto';
import { CreateUserDto } from '../../../domain/user/dtos/createUser.dto';
import { UpdateUserDto } from '../../../domain/user/dtos/updateUser.dto';
import IUserRepository from '../../../domain/user/repositories/userRepository';

@injectable()
export default class PrismaUserQueries implements IUserRepository {
  
  constructor(
    @inject("PrismaClient") private prisma: PrismaClient
  ) {}

  async create(user: CreateUserDto) {
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        roles: {
          connect: user.roles.map(id => ({ id: id}))
        }
      },
      include: {
        roles: true
      }
    })

    return createdUser
  }

  async deactivate(id: string) {
    const deleteUser = await this.prisma.user.delete({ where: { id: id} })
    return deleteUser
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email }})
    return user || undefined
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { id: id }, 
      include: { 
        roles: true
      }
    })
    
    return user || undefined
  }

  async update(user: UpdateUserDto) {
    const roles = await this.prisma.roles.findMany({
      where: {
        users:{
          some: {
            id: user.id
          } 
        }
      },
      select: {
        id: true
      }
    })

    const combinedRoles = user.roles?.concat(roles.map(p => p.id));
    const newRoles = combinedRoles?.filter((permission, index) => {
      return combinedRoles.indexOf(permission) === index && user?.roles?.includes(permission);
    });

    const updatedUser = await this.prisma.user.update({ 
      where: { id: user.id }, 
      data: {
        name: user.name,
        email: user.email, 
        roles: { 
          disconnect: roles.map(id => id),
          connect: newRoles?.map(id => ({ id: id}))
        }
      }, include: {
        roles: true
      }
    })
    
    return updatedUser
  }

  async updatePassword(user: ChangePasswordDto) {
    const updatedUserPassword = await this.prisma.user.update({ 
      where: { id: user.id }, 
      data: {
        password: user.password,
      }
    })
    
    return updatedUserPassword
  }

  async getRolesByUserId(id: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { id: id }, 
      include: { 
        roles: true
      }
    })

    return user?.roles || undefined
  }


  public async findPermissionsByUserId(user_id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id
      },
      include: {
        roles: {
          include: {
            permissions: true
          }
        }
      }
    })

    const permissions = user?.roles.flatMap(role => role.permissions.map(permission => permission))

    return permissions
  }
}