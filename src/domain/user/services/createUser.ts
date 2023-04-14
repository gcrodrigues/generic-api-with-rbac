import { inject, injectable } from "tsyringe";
import { CreateUserDto } from "../dtos/createUser.dto";
import AppError from "../../../infra/errors/AppError";
import IUserRepository from "../repositories/userRepository";
import IHashProvider from "../../auth/providers/hashProvider/models/IHashProvider";
import { Password } from "../utils/password";

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  async execute(user: CreateUserDto) {    
    const passwordUtil =  new Password(user.password)
    const isPasswordValid = await passwordUtil.isValid()
    
    if(!isPasswordValid) {
      throw new AppError("Password invalid");
    }

    const userAlreadyExists = await this.userRepository.findByEmail(user.email)
    
    if(userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const hashedPassword = await this.hashProvider.generateHash(user.password) 

    const createdUser = await this.userRepository.create({...user, password: hashedPassword});

    return createdUser
  }
}