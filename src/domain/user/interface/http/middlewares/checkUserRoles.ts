import { Request, Response, NextFunction } from 'express';

import AppError from '../../../../../infra/errors/AppError';
import { GetUserRolesService } from '../../../../roles/services/getUserRoles';
import { container } from 'tsyringe';

export default function checkUserRoles(roles: string[]): ( req: Request,
  res: Response,
  next: NextFunction) => Promise<void> {
  return async (
    req,
    res,
    next
  ) => {
    const { id } = req.user;
    const getUserRolesService = container.resolve(GetUserRolesService)
    if (!id) {
      throw new AppError('Forbidden', 403);
    }
    try {
      const userRoles = await getUserRolesService.execute(id)

      const authorizedRoles = userRoles.filter(role => roles.includes(role.name))

      if(userRoles.filter(role => role.name === 'Admin').length) {
        return next()
      }
      
      if(!authorizedRoles.length) {
        throw new AppError('Forbidden', 403);
      }
      
      return next();
    } catch (err) {
      throw new AppError('Forbidden', 403);
    }
  }
}
