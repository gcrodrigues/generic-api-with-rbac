import { describe, expect, beforeEach, it} from '@jest/globals';

import MockPermissionsRepository from '../repositories/mocks/mockPermissionsRepository';

import { CreatePermissionService } from './createPermission';
import { DeactivatePermissionService } from './deactivatePermission';
import { ListPermissionsService } from './listPermissionsService';

import AppError from '../../../infra/errors/AppError';


let mockPermissionsRepository: MockPermissionsRepository;
let createPermissionService: CreatePermissionService;
let deactivatePermissionService: DeactivatePermissionService;
let listPermissionsService: ListPermissionsService;

describe('Deactivate Permission', () => {
  beforeEach(() => {
    mockPermissionsRepository = new MockPermissionsRepository()
    createPermissionService = new CreatePermissionService(mockPermissionsRepository)
    deactivatePermissionService = new DeactivatePermissionService(mockPermissionsRepository)
    listPermissionsService = new ListPermissionsService(mockPermissionsRepository)
  })

  it('should be able to deactivate a permission', async () => {
    const permission = await createPermissionService.execute({
      action: 'action',
      resource: 'resource'
    });

    await deactivatePermissionService.execute(permission.id)

    const permissions = await listPermissionsService.execute()
    expect(permissions).not.toContain(permission);
  })

  it('shouldn\'t be able to deactivate a non-existing permission', async () => {
    expect(async () => 
      await deactivatePermissionService.execute('fake_id')
    ).rejects.toBeInstanceOf(AppError);
  })
})