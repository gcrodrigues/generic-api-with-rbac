import { describe, expect, beforeEach, it} from '@jest/globals';

import { CreateRoleService } from './createRole';
import MockRolesRepository from '../repositories/mocks/mockRolesRepository';
import { UpdateRolePermissionsService } from './updateRolePermissions';
import AppError from '../../../infra/errors/AppError';


let mockRolesRepository: MockRolesRepository;
let createRoleService: CreateRoleService;
let updateRolePermissionsService: UpdateRolePermissionsService;

describe('Update Role Permissions', () => {
  beforeEach(() => {
    mockRolesRepository = new MockRolesRepository()
    createRoleService = new CreateRoleService(mockRolesRepository)
    updateRolePermissionsService = new UpdateRolePermissionsService(mockRolesRepository)
  })

  it('should be able to update role permissions', async () => {
    const role = await createRoleService.execute({
      name: 'Role',
      permissions: ['1','2','4']
    });

    const roleUpdated = await updateRolePermissionsService.execute({id: role.id, permissions: ['1', '2', '3']})

    expect(role).not.toEqual(roleUpdated);
  })

  it('shouldn\'t be able to update nonexistent role', async () => {
    expect(async () => 
        await updateRolePermissionsService.execute({id: 'fake_id', permissions: ['1', '2', '4']})
    ).rejects.toBeInstanceOf(AppError);
  })
})