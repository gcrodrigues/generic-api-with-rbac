import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePermissionService } from '../../../services/createPermission';
import { ListPermissionsService } from '../../../services/listPermissionsService';
import { DeactivatePermissionService } from '../../../services/deactivatePermission';

export class PermissionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { action, resource } = req.body;
    const createPermission = container.resolve(CreatePermissionService);
    const permission = await createPermission.execute({ action, resource }); 
    
    return res.status(200).json(permission)
  }

  async index(req: Request, res: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionsService);
    const permissions = await listPermissions.execute(); 
    
    return res.status(200).json(permissions)
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const deactivatePermission = container.resolve(DeactivatePermissionService);
    await deactivatePermission.execute(id); 
    
    return res.status(200)
}
}
