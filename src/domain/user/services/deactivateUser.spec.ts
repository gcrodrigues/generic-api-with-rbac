import { describe, expect, beforeEach, it} from '@jest/globals';

import MockUserRepository from '../repositories/mocks/mockUserRepository';
import AppError from '../../../infra/errors/AppError';
import { DeactivateUserService } from './deactivateUser';
import MockHashProvider from '../../auth/providers/hashProvider/mocks/mockHashProvider';


let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let deactivateUserService: DeactivateUserService;

describe('Deactivate User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()

    deactivateUserService = new DeactivateUserService(mockUserRepository)
  })

  it('should be able to deactivate user', async () => {
    const userCreated = await mockUserRepository.create({
      name: 'Multiexperience',
      email: 'mx@email.com',
      password: 'Test@123',
      roles: []
    });

    await deactivateUserService.execute(userCreated.id)
    const user = await mockUserRepository.findById(userCreated.id)
    expect(user).toBeUndefined()
  })

  it('should not be able to deactivate a non-existent user', async () => {
    const fakeId = 'fake-id'
    expect(async () => {
      await deactivateUserService.execute(fakeId)
    }).rejects.toBeInstanceOf(AppError)
  })
})