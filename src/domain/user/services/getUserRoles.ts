import { inject, injectable } from "tsyringe";
import AppError from "../../../infra/errors/AppError";
import IUserRepository from "../repositories/userRepository";

@injectable()
export class GetUserRolesService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(user_id: string) {
    const user = await this.userRepository.findById(user_id)

    if(!user?.roles) {
      throw new AppError("Could not find user roles.");
    }

    return user.roles
  }
}