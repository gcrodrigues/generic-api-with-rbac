import { describe, expect, beforeEach, it } from '@jest/globals';


import { CreatePermissionService } from '../../permissions/services/createPermission';
import { DeactivatePermissionService } from '../../permissions/services/deactivatePermission';
import MockPermissionsRepository from '../../permissions/repositories/mocks/mockPermissionsRepository';

import { CreateRoleService } from '../../roles/services/createRole';
import MockRolesRepository from '../../roles/repositories/mocks/mockRolesRepository';


import { ListPermissionsByUserIdService } from './listPermissionsByUserId';
import { CreateUserService } from './createUser';
import MockHashProvider from '../../auth/providers/hashProvider/mocks/mockHashProvider';
import MockUserRepository from '../repositories/mocks/mockUserRepository';


let mockPermissionsRepository: MockPermissionsRepository;
let createPermissionService: CreatePermissionService;
let deactivatePermissionService: DeactivatePermissionService;
let listPermissionsByUserIdService: ListPermissionsByUserIdService;

let mockRolesRepository: MockRolesRepository
let createRoleService: CreateRoleService;


let mockUserRepository: MockUserRepository
let mockHashProvider: MockHashProvider
let createUserService: CreateUserService;

describe('List permissions by user id', () => {
  beforeEach(() => {
    mockPermissionsRepository = new MockPermissionsRepository()
    deactivatePermissionService = new DeactivatePermissionService(mockPermissionsRepository)
    createPermissionService = new CreatePermissionService(mockPermissionsRepository)
    
    mockRolesRepository = new MockRolesRepository()
    createRoleService = new CreateRoleService(mockRolesRepository);
    
    mockUserRepository = new MockUserRepository()
    mockHashProvider = new MockHashProvider()
    listPermissionsByUserIdService = new ListPermissionsByUserIdService(mockUserRepository)
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
      permissions: [permission2.id],
    }
    const role = await createRoleService.execute(mockRole)

    const mockUser = {
      email: 'user@teste.com',
      name: 'user',
      password: 'Mauc.12345',
      roles: [
        role.id
      ],
    }
    
    const user = await createUserService.execute(mockUser)

    const userPermissions = await listPermissionsByUserIdService.execute(user.id)

    expect(userPermissions).not.toContain(permission2);
  })
})