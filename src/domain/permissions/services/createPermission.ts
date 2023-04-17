import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IPermissionsRepository from "../repositories/permissionsRepository";
import { CreatePermissionDto } from "../dtos/createPermission.dto";

@injectable()
export class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository') private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute(permission: CreatePermissionDto) {
    const permissionAlreadyExists = await this.permissionsRepository.findByActionAndResource(permission)

    if(permissionAlreadyExists) {
      throw new AppError("This permission already exists");
    }

    const createdPermission = await this.permissionsRepository.create(permission)
    
    return createdPermission
  }
}