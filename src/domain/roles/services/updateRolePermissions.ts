import { inject, injectable } from "tsyringe";
import IRolesRepository from "../repositories/rolesRepository";
import { UpdateRolePermissionsDto } from "../dtos/updateRolePermissions";
import AppError from "../../../infra/errors/AppError";

@injectable()
export class UpdateRolePermissionsService {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}
  
  async execute(role: UpdateRolePermissionsDto) {
    const roleExists = await this.rolesRepository.findById(role.id)

    if (!roleExists) {
      throw new AppError('Role do not exists.')
    }

    const updateRole = await this.rolesRepository.updatePermissions(role)

    return updateRole
  }
}