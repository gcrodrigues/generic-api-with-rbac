import { describe, expect, beforeEach, it} from '@jest/globals';

import AppError from '../../../infra/errors/AppError';
import { AuthenticateUser } from './authenticateUser'
import MockUserRepository from '../../user/repositories/mocks/mockUserRepository';
import MockHashProvider from '../../auth/providers/hashProvider/mocks/mockHashProvider'


let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let authenticateUser: AuthenticateUser;

describe('Authenticate User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    authenticateUser = new AuthenticateUser(mockUserRepository, mockHashProvider)
  })

  it('should be able to authenticate', async () => {
    const user = await mockUserRepository.create({
      name: 'Multiexperience',
      email: 'mx@email.com',
      password: 'Test@123',
      roles: []
    });

    const response = await authenticateUser.execute({
      email: 'mx@email.com',
      password: 'Test@123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  
  it('should have a valid and existent email', () => {
    const email = 'invalid_email'
    const password = '123456'

    expect(async () => {
      await authenticateUser.execute({email, password})
    }).rejects.toBeInstanceOf(AppError)
  })
  
  it('should match user stored password', async () => {
    await mockUserRepository.create({
      email:'mx@email.com',
      name: 'Multiexperience',
      password: 'Test@123',
      roles: []
    })
    const email = 'mx@email.com'
    const password = 'Test#678'

    expect(async () => {
      await authenticateUser.execute({email, password})
    }).rejects.toBeInstanceOf(AppError)
  })
})