import { describe, expect, beforeEach, it, jest} from '@jest/globals';


import { CreatePermissionService } from '../../permissions/services/createPermission';
import { DeactivatePermissionService } from '../../permissions/services/deactivatePermission';
import MockPermissionsRepository from '../../permissions/repositories/mocks/mockPermissionsRepository';

import { CreateRoleService } from './createRole';
import MockRolesRepository from '../repositories/mocks/mockRolesRepository';


import { ListRolesService } from './listRolesService';
import { CreateUserService } from '../../user/services/createUser';
import MockHashProvider from '../../auth/providers/hashProvider/mocks/mockHashProvider';
import MockUserRepository from '../../user/repositories/mocks/mockUserRepository';
import { ListPermissionsByRoleIdService } from './listPermissionsByRoleId';


let mockPermissionsRepository: MockPermissionsRepository;
let createPermissionService: CreatePermissionService;
let deactivatePermissionService: DeactivatePermissionService;
let listPermissionsByRoleIdService: ListPermissionsByRoleIdService;

let mockRolesRepository: MockRolesRepository
let createRoleService: CreateRoleService;


let mockUserRepository: MockUserRepository
let mockHashProvider: MockHashProvider
let createUserService: CreateUserService;

describe('List permissions by role id', () => {
  beforeEach(() => {
    mockPermissionsRepository = new MockPermissionsRepository()
    deactivatePermissionService = new DeactivatePermissionService(mockPermissionsRepository)
    createPermissionService = new CreatePermissionService(mockPermissionsRepository)
    
    mockRolesRepository = new MockRolesRepository()
    createRoleService = new CreateRoleService(mockRolesRepository);
    
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    listPermissionsByRoleIdService = new ListPermissionsByRoleIdService(mockRolesRepository)
    createUserService = new CreateUserService(mockUserRepository, mockHashProvider);
  })

  it('should be able to list user\'s permissions', async () => {
    const permission1 = await createPermissionService.execute({
      action: 'action',
      resource: 'resource'
    });
    const permission2 = await createPermissionService.execute({
      action: 'action2',
      resource: 'resource2'
    });

    const mockRole = {
      name: 'Role',
      permissions: [
        permission2.id
      ],
    }

    const role = await createRoleService.execute(mockRole)

    const permissions = await listPermissionsByRoleIdService.execute(role.id)

    expect(permissions).not.toContain(permission1.id);
  })
})