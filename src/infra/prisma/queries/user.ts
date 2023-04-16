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
    return user
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id }})
    return user
  }

  async update(user: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({ 
      where: { id: user.id }, 
      data: {
        name: user.name,
        email: user.email
      }
    })
    
    return updatedUser
  }

  async updatePassword(user: ChangePasswordDto) {
    const updatedUser = await this.prisma.user.update({ 
      where: { id: user.id }, 
      data: {
        password: user.password,
      }
    })
    
    return updatedUser
  }
}