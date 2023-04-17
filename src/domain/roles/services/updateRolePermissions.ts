import { inject, injectable } from "tsyringe";
import IRolesRepository from "../repositories/rolesRepository";
import { UpdateRolePermissionsDto } from "../dtos/updateRolePermissions";

@injectable()
export class UpdateRolePermissionsService {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}
  
  async execute(role: UpdateRolePermissionsDto) {
    const updateRole = await this.rolesRepository.updatePermissions(role)

    return updateRole
  }
}