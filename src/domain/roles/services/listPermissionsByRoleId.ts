import { inject, injectable } from "tsyringe";

import IRolesRepository from "../repositories/rolesRepository";

@injectable()
export class ListPermissionsByRoleIdService {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute(role_id: string) {
    const permissions = await this.rolesRepository.findPermissionsByRoleId(role_id)
    return permissions
  }
}