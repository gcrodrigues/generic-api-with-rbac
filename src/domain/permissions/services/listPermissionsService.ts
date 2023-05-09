import { inject, injectable } from "tsyringe";
import IPermissionsRepository from "../repositories/permissionsRepository";

@injectable()
export class ListPermissionsService {
  constructor(
    @inject('PermissionsRepository') private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute() {
    const permissions = await this.permissionsRepository.findAll()
    return permissions
  }
}