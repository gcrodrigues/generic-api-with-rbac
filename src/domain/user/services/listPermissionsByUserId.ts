import { inject, injectable } from "tsyringe";

import IUserRepository from "../repositories/userRepository";

@injectable()
export class ListPermissionsByUserIdService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(user_id: string) {
    const permissions = await this.userRepository.findPermissionsByUserId(user_id)
    return permissions
  }
}