import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IPermissionsRepository from "../repositories/permissionsRepository";

@injectable()
export class GetPermissionsByUserIdService {
  constructor(
    @inject('PermissionsRepository') private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute(user_id: string) {
    const permissions = await this.permissionsRepository.getByUserId(user_id)
    return permissions
  }
}