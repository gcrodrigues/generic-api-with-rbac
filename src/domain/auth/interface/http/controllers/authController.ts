import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUser } from '../../../services/authenticateUser';

export class AuthController {
  async auth(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authemticateUser = container.resolve(AuthenticateUser);
    const { token, user } = await authemticateUser.execute({ email, password }); 
    
    // @ts-expect-error deleting user password
    delete user.password;
    return res.status(200).json({ token, user })
  }
}
