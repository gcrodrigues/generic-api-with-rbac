import { Request, Response, NextFunction } from 'express';

import AppError from '../../../../../infra/errors/AppError';
import { container } from 'tsyringe';
import { ListPermissionsByUserIdService } from '../../../../user/services/listPermissionsByUserId'

export default function checkPermissions(permissions: string[]): (req: Request,
  res: Response,
  next: NextFunction) => void {
  return async (
    req,
    res,
    next
  ) => {
    const { id } = req.user

    const listUserPermissions = container.resolve(ListPermissionsByUserIdService)

    if (!id) {
      throw new AppError('Forbidden', 403);
    }
    try {
      const userPermissions = await listUserPermissions.execute(id)
      
      const isAuthorized = userPermissions?.filter(permission => permissions.includes(`${permission.resource}:${permission.action}`))

      if(!isAuthorized?.length) {
        throw new AppError('Forbidden', 403);
      }

      return next();
    } catch (err) {
      throw new AppError('Forbidden', 403);
    }
  }
}
