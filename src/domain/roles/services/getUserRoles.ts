import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IRolesRepository from "../repositories/rolesRepository";

@injectable()
export class GetUserRolesService {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute(user_id: string) {
    const roles = await this.rolesRepository.getByUserId(user_id)

    if(!roles) {
      throw new AppError("This user don't have any role");
    }
    return roles
  }
}