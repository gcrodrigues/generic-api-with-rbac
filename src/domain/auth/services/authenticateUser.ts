import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken'
import IUserRepository from "../../user/repositories/userRepository";
import AppError from "../../../infra/errors/AppError";
import { AuthenticateDTO } from "../dtos/authenticate.dto";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";
import auth from "../../../config/auth";

@injectable()
export class AuthenticateUser {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,

  ) {}

  async execute({email, password}: AuthenticateDTO) {
    const user = await this.userRepository.findByEmail(email)

    if(!user) {
      throw new AppError("Email or password are incorrect.");
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if(!passwordMatched) {
      throw new AppError("Email or password are incorrect.");
    }

    const {expiresIn, secret} = auth.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}