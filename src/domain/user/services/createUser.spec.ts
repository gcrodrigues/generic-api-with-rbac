import { describe, expect, beforeEach, it} from '@jest/globals';

import MockUserRepository from '../repositories/mocks/mockUserRepository';
import MockHashProvider from '../../auth/providers/hashProvider/mocks/mockHashProvider'
import { CreateUserService } from './createUser';
import AppError from '../../../infra/errors/AppError';


let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let createUserService: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    createUserService = new CreateUserService(mockUserRepository, mockHashProvider)
  })

  it('should be able to create user', async () => {
    const user = await createUserService.execute({
      name: 'Multiexperience',
      email: 'mx@email.com',
      password: 'Test@123',
      roles: ['1']
    });

    expect(user).toHaveProperty('id');
  })

  it('should have a valid password', () => {
    expect(async () => {
      await createUserService.execute({
        name: 'Multiexperience',
        email: 'mx@email.com',
        password: '234124432',
        roles: ['1']
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should have at least one role', () => {
    expect(async () => {
      await createUserService.execute({
        name: 'Multiexperience',
        email: 'mx@email.com',
        password: 'Test@123',
        roles: []
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a user with already existent email', async () => {
    await createUserService.execute({
      name: 'Multiexperience',
      email: 'mx@email.com',
      password: 'Test@123',
      roles: ['1']
    });
    
    expect(async () => {
        await createUserService.execute({
          name: 'Multiexperience 2',
          email: 'mx@email.com',
          password: 'Test@123',
          roles: ['1']
        })
      }).rejects.toBeInstanceOf(AppError)
  })
})