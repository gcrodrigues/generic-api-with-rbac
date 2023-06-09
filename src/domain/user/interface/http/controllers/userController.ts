import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '../../../services/createUser';
import { DeactivateUserService } from '../../../services/deactivateUser';
import { UpdateUserService } from '../../../services/updateUser';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, roles } = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password, roles}); 
    
    // @ts-expect-error deleting user password
    delete user.password;
    return res.status(200).json(user)
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const deactivateUser = container.resolve(DeactivateUserService);
    const deactivatedUser = await deactivateUser.execute(id); 
    return res.status(200).json({id: deactivatedUser.id})
  }
  
  async update(req: Request, res: Response): Promise<Response> {
    const { id, name, email, roles } = req.body;
    const updateUser = container.resolve(UpdateUserService);
    const updatedUser = await updateUser.execute({ id, name, email, roles }); 

    // @ts-expect-error deleting user password
    delete updatedUser.password;
    return res.status(200).json(updatedUser)
  }
}
