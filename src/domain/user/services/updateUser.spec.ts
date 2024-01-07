import { describe, expect, beforeEach, it} from '@jest/globals';

import MockUserRepository from '../repositories/mocks/mockUserRepository';
import AppError from '../../../infra/errors/AppError';
import { UpdateUserService } from './updateUser';
import MockHashProvider from '../../auth/providers/hashProvider/mocks/mockHashProvider';


let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let updateUserService: UpdateUserService;

describe('Update User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()

    updateUserService = new UpdateUserService(mockUserRepository)
  })

  it('should be able to update user', async () => {
    const userCreated = await mockUserRepository.create({
      name: 'Multiexperience',
      email: 'mx@email.com',
      password: 'Test@123',
      roles: []
    });

    const updatedUser = await updateUserService.execute({
      ...userCreated,
      name: 'Multiexperience Updated',
      email: 'mx-updated@email.com'
    })

    expect(updatedUser.name).not.toBe(userCreated.name)
    expect(updatedUser.email).not.toBe(userCreated.email)
  })

  it('should not be able to deactivate a non-existent user', async () => {
    const userCreated = await mockUserRepository.create({
      name: 'Multiexperience',
      email: 'teste@test.com',
      password: 'Test@123',
      roles: []
    })

    await expect(updateUserService.execute({
      ...userCreated,
      id: 'non-existent-user'
    })).rejects.toBeInstanceOf(AppError)
  })
})