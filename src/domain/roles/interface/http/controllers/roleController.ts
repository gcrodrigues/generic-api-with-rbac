import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRoleService } from '../../../services/createRole';
import { UpdateRolePermissionsService } from '../../../services/updateRolePermissions';
import { ListRolesService } from '../../../services/listRolesService';
import { DeactivateRoleService } from '../../../services/deactivateRole';
import { ListPermissionsByRoleIdService } from '../../../services/listPermissionsByRoleId';

export class RoleController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, permissions } = req.body;
    const createRole = container.resolve(CreateRoleService);
    const role = await createRole.execute({ name, permissions }); 
    
    return res.status(200).json(role)
  }

  async updatePermissions(req: Request, res: Response): Promise<Response> {
    const { id, permissions } = req.body;
    const updateRole = container.resolve(UpdateRolePermissionsService);
    const role = await updateRole.execute({ id, permissions }); 
    
    return res.status(200).json(role)
  }

  async index(req: Request, res: Response): Promise<Response> {
    const listRoles = container.resolve(ListRolesService);
    const roles = await listRoles.execute(); 
    
    return res.status(200).json(roles)
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const deactivateRole = container.resolve(DeactivateRoleService);
    await deactivateRole.execute(id); 
    
    return res.status(200)
  }

  public async listRolePermissions(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const listPermissionsByRoleId = container.resolve(
      ListPermissionsByRoleIdService,
    );
    const permissions = await listPermissionsByRoleId.execute(id);

    return res.status(200).json(permissions);
  }
}
