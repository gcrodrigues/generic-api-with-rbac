import { Request, Response, NextFunction } from 'express';

import AppError from '../../../../../infra/errors/AppError';
import { container } from 'tsyringe';
import { GetPermissionsByUserIdService } from '../../../services/getPermissionsByUserId'; 

export default function checkPermissions(permissions: string[]): (req: Request,
  res: Response,
  next: NextFunction) => void {
  return async (
    req,
    res,
    next
  ) => {
    const { id } = req.user

    const getUserPermissions = container.resolve(GetPermissionsByUserIdService)

    if (!id) {
      throw new AppError('Forbidden', 403);
    }
    try {
      const userPermissions = await getUserPermissions.execute(id)
      
      const isAuthorized = userPermissions.filter(permission => permissions.includes(`${permission.resource}:${permission.action}`))

      if(!isAuthorized.length) {
        throw new AppError('Forbidden', 403);
      }

      return next();
    } catch (err) {
      throw new AppError('Forbidden', 403);
    }
  }
}
