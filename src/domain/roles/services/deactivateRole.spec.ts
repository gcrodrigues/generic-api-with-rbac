import { describe, expect, beforeEach, it} from '@jest/globals';

import { CreateRoleService } from './createRole';
import MockRolesRepository from '../repositories/mocks/mockRolesRepository';
import AppError from '../../../infra/errors/AppError';
import { DeactivateRoleService } from './deactivateRole';
import { ListRolesService } from './listRolesService';


let mockRolesRepository: MockRolesRepository;
let createRoleService: CreateRoleService;
let deactivateRoleService: DeactivateRoleService;
let listRolesService: ListRolesService;

describe('Deactivate Role', () => {
  beforeEach(() => {
    mockRolesRepository = new MockRolesRepository()
    createRoleService = new CreateRoleService(mockRolesRepository)
    deactivateRoleService = new DeactivateRoleService(mockRolesRepository)
    listRolesService = new ListRolesService(mockRolesRepository)
  })

  it('should be able to deactivate a role', async () => {
    const role = await createRoleService.execute({
      name: 'Role',
      permissions: []
    });

    await deactivateRoleService.execute(role.id)

    const roles = await listRolesService.execute()
    expect(roles).not.toContain(role);
  })

  it('shouldn\'t be able to deactivate a non-existing role', async () => {
    expect(async () => 
      await deactivateRoleService.execute('fake_id')
    ).rejects.toBeInstanceOf(AppError);
  })
})