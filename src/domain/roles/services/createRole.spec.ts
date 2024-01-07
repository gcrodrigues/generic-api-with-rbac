import { describe, expect, beforeEach, it} from '@jest/globals';

import { CreateRoleService } from './createRole';
import MockRolesRepository from '../repositories/mocks/mockRolesRepository';
import AppError from '../../../infra/errors/AppError';


let mockRolesRepository: MockRolesRepository;
let createRoleService: CreateRoleService;

describe('Create Role', () => {
  beforeEach(() => {
    mockRolesRepository = new MockRolesRepository()
    createRoleService = new CreateRoleService(mockRolesRepository)
  })

  it('should be able to create a role', async () => {
    const role = await createRoleService.execute({
      name: 'Role',
      permissions: []
    });

    expect(role).toHaveProperty('id');
  })

  it('shouldn\'t be able to create a role that already exists', async () => {
    await createRoleService.execute({
      name: 'Role 1',
      permissions: []
    });

    expect(async () => 
      await createRoleService.execute({
        name: 'Role 1',
        permissions: []
    })).rejects.toBeInstanceOf(AppError);
  })
})