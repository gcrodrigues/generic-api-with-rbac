import { Request, Response, NextFunction } from 'express';


import AppError from '../../../../../infra/errors/AppError';
import { container } from 'tsyringe';
import { GetPermissionsByRolesIdService } from '../../../services/getPermissionsByRoleId';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function checkPermissions(permissions: string[]): (req: Request,
  res: Response,
  next: NextFunction) => void {
  return async (
    req,
    res,
    next
  ) => {
    const { id } = req.user

    const getPermissionsByRoleIdService = container.resolve(GetPermissionsByRolesIdService)

    if (!id) {
      throw new AppError('Forbidden', 403);
    }
    try {
      const userRolePermissions = await getPermissionsByRoleIdService.execute(id)

      const isAuthorized = userRolePermissions.filter(permission => permissions.includes(`${permission.resource}:${permission.action}`))

      if(!isAuthorized.length) {
        throw new AppError('Forbidden', 403);
      }

      return next();
    } catch (err) {
      throw new AppError('Forbidden', 403);
    }
  }
}
