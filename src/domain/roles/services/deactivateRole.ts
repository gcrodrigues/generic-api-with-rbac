import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IRolesRepository from "../repositories/rolesRepository";

@injectable()
export class DeactivateRoleService {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute(id: string) {
    const roleExists = await this.rolesRepository.findById(id)

    if(!roleExists) {
      throw new AppError("This role do not exists");
    }
    
    const deletedRole = await this.rolesRepository.deactivate(id);

    if(!deletedRole) {
      throw new AppError("Could not deactivate role");
    }

    return deletedRole
  }
}