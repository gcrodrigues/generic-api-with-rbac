import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/userRepository";
import AppError from "../../../infra/errors/AppError";

@injectable()
export class ShowUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id)

    if(!user) {
      throw new AppError("This user don't exists");
    }

    return user
  }
}