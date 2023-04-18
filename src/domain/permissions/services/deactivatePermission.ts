import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IPermissionsRepository from "../repositories/permissionsRepository";

@injectable()
export class DeactivatePermissionService {
  constructor(
    @inject('PermissionsRepository') private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute(id: string) {
    const permissionExists = await this.permissionsRepository.findById(id)

    if(!permissionExists) {
      throw new AppError("This role do not exists");
    }
    
    const deletedPermission = await this.permissionsRepository.deactivate(id);

    if(!deletedPermission) {
      throw new AppError("Could not deactivate role");
    }

    return deletedPermission
  }
}