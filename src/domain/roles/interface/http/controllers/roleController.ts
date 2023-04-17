import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRoleService } from '../../../services/createRole';

export class RoleController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, permissions } = req.body;
    const createRole = container.resolve(CreateRoleService);
    const role = await createRole.execute({ name, permissions }); 
    
    return res.status(200).json(role)
  }
}
