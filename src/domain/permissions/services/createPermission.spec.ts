import { describe, expect, beforeEach, it} from '@jest/globals';

import { CreatePermissionService } from './createPermission';
import AppError from '../../../infra/errors/AppError';
import MockPermissionsRepository from '../repositories/mocks/mockPermissionsRepository';


let mockPermissionsRepository: MockPermissionsRepository;
let createPermissionService: CreatePermissionService;

describe('Create Permission', () => {
  beforeEach(() => {
    mockPermissionsRepository = new MockPermissionsRepository()
    createPermissionService = new CreatePermissionService(mockPermissionsRepository)
  })

  it('should be able to create a role', async () => {
    const permission = await createPermissionService.execute({
      action: 'action',
      resource: 'resource'
    });

    expect(permission).toHaveProperty('id');
  })

  it('shouldn\'t be able to create a role that already exists', async () => {
    await createPermissionService.execute({
      action: 'action',
      resource: 'resource'
    });

    expect(async () => 
      await createPermissionService.execute({
        action: 'action',
        resource: 'resource'
    })).rejects.toBeInstanceOf(AppError);
  })
})