import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePermissionService } from '../../../services/createPermission';

export class PermissionsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { action, resource } = req.body;
    const createPermission = container.resolve(CreatePermissionService);
    const permission = await createPermission.execute({ action, resource }); 
    
    return res.status(200).json(permission)
  }
}
