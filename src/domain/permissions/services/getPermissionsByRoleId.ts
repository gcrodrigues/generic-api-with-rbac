import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IPermissionsRepository from "../repositories/permissionsRepository";

@injectable()
export class GetPermissionsByRolesIdService {
  constructor(
    @inject('PermissionsRepository') private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute(role_id: string) {
    const permissions = await this.permissionsRepository.getByRoleId(role_id)

    if(!permissions) {
      throw new AppError("This role don't have any permission");
    }
    
    return permissions
  }
}