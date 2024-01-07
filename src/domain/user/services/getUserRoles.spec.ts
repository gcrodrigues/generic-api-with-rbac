import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { User } from '@prisma/client';

import MockUserRepository from '../repositories/mocks/mockUserRepository';
import AppError from '../../../infra/errors/AppError';
import { GetUserRolesService } from './getUserRoles';
import MockRolesRepository from '../../roles/repositories/mocks/mockRolesRepository';
import { ShowUserService } from './showUser';


let mockUserRepository: MockUserRepository;
let mockRolesRepository: MockRolesRepository;
let getUserRolesService: GetUserRolesService;
let showUserService: ShowUserService;

describe('Get User Roles', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockRolesRepository = new MockRolesRepository()
    getUserRolesService = new GetUserRolesService(mockUserRepository)
    showUserService = new ShowUserService(mockUserRepository)
  })

  it('should be able to show user\'s roles', async () => {
    const createdRole = await mockRolesRepository.create({
      name: 'Role 1',
      permissions:[]
    })

    const user = await mockUserRepository.create({
      name: 'Multiexperience',
      email: 'mx@email.com',
      password: 'Test@123',
      roles: [createdRole.id]
    });

    const userFound = await getUserRolesService.execute(user.id)
    expect(userFound[0]).toBe(createdRole.id);
  })
  
  it('should not show non-existent roles', async () => {
    expect(async () => {
      await getUserRolesService.execute('fsdfsdf')
    }).rejects.toBeInstanceOf(AppError);
  })
})