import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IRolesRepository from "../repositories/rolesRepository";
import { CreateRoleDto } from "../dtos/createRole.dto";

@injectable()
export class CreateRoleService {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}
  
  async execute(role: CreateRoleDto) {
    if(!role.name) {
      throw new AppError('Role must have a name', 400);
    }

    const roleAlreadyExists = await this.rolesRepository.findByName(role.name)

    console.log(roleAlreadyExists)

    if(roleAlreadyExists) {
      throw new AppError('This role already exists', 400);
    }

    const createdRole = await this.rolesRepository.create(role)

    return createdRole
  }
}