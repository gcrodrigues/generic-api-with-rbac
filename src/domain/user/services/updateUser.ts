import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/userRepository";
import AppError from "../../../infra/errors/AppError";
import { User } from "@prisma/client";
import { UpdateUserDto } from "../dtos/updateUser.dto";

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(user: UpdateUserDto) {
    const userExists = await this.userRepository.findById(user.id)

    if(!userExists) {
      throw new AppError("Not able to update this user");
    }

    const updatedUser = await this.userRepository.update(user);

    return updatedUser
  }
}