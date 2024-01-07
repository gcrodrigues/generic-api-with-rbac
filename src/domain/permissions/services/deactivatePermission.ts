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
    
    await this.permissionsRepository.deactivate(id);
  }
}