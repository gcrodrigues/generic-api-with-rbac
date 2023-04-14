import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/userRepository";
import AppError from "../../../infra/errors/AppError";

@injectable()
export class DeactivateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(id: string) {
    const userExists = await this.userRepository.findById(id)

    if(!userExists) {
      throw new AppError("This user do not exists");
    }

    const createdUser = await this.userRepository.deactivate(id);

    if(!createdUser.id) {
      throw new AppError("Could not deactivate user");
    }

    return createdUser
  }
}