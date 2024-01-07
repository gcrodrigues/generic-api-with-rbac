import { describe, expect, beforeEach, it} from '@jest/globals';

import MockUserRepository from '../repositories/mocks/mockUserRepository';
import { DeactivateUserService } from './deactivateUser';
import MockHashProvider from '../../auth/providers/hashProvider/mocks/mockHashProvider';
import { ShowUserService } from './showUser';
import AppError from '../../../infra/errors/AppError';


let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let deactivateUserService: DeactivateUserService;
let showUserService: ShowUserService;

describe('Show User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()

    deactivateUserService = new DeactivateUserService(mockUserRepository)
    showUserService = new ShowUserService(mockUserRepository)
  })

  it('should be able to list user', async () => {
    const user = await mockUserRepository.create({
      name: 'Multiexperience',
      email: 'mx@email.com',
      password: 'Test@123',
      roles: []
    });

    const userFound = await showUserService.execute(user.id)

    expect(userFound.name).toBe(user.name);
    expect(userFound.email).toBe(user.email);
  })

  it('should not show non-existent user', async () => {
    expect(async () => {
      await showUserService.execute('fsdfsdf')
    }).rejects.toBeInstanceOf(AppError);
  })
})