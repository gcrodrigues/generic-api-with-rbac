import { describe, expect, beforeEach, it} from '@jest/globals';

import MockPermissionsRepository from '../repositories/mocks/mockPermissionsRepository';

import { CreatePermissionService } from './createPermission';
import { DeactivatePermissionService } from './deactivatePermission';
import { ListPermissionsService } from './listPermissionsService';


let mockPermissionsRepository: MockPermissionsRepository;
let createPermissionService: CreatePermissionService;
let deactivatePermissionService: DeactivatePermissionService;
let listPermissionsService: ListPermissionsService;

describe('List permissions', () => {
  beforeEach(() => {
    mockPermissionsRepository = new MockPermissionsRepository()
    createPermissionService = new CreatePermissionService(mockPermissionsRepository)
    deactivatePermissionService = new DeactivatePermissionService(mockPermissionsRepository)
    listPermissionsService = new ListPermissionsService(mockPermissionsRepository)
  })

  it('should be able to list permissions', async () => {
    const permission = await createPermissionService.execute({
      action: 'action',
      resource: 'resource'
    });

    const permissions = await listPermissionsService.execute()
    expect(permissions).toContain(permission);
  })
})