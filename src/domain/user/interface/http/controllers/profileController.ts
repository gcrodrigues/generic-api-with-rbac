import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserService } from '../../../services/shoowUser';
import { UpdateUserService } from '../../../services/updateUser';
import { DeactivateUserService } from '../../../services/deactivateUser';

export class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute(user_id);

    // @ts-expect-error deleting user password
    delete user.password;
    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id, email, name } = req.body;
    const updateUser = container.resolve(UpdateUserService);
    const updatedUser = await updateUser.execute({id, name, email}); 
    
    // @ts-expect-error deleting user password
    delete updatedUser.password;
    return res.status(200).json(updatedUser)
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const deactivateUser = container.resolve(DeactivateUserService);
    const deactivatedUser = await deactivateUser.execute(id); 
    return res.status(200).json({id: deactivatedUser.id})
  }
}
