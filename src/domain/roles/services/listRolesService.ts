import { inject, injectable } from "tsyringe";
import IRolesRepository from "../repositories/rolesRepository";

@injectable()
export class ListRolesService {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository
  ) {}

  async execute() {
    const roles = await this.rolesRepository.findAll()
    return roles
  }
}