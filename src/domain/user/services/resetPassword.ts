import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import IUserTokensRepository from '../repositories/userTokensRepository';
import IUserRepository from '../repositories/userRepository';
import IHashProvider from '../../auth/providers/hashProvider/models/IHashProvider';
import AppError from '../../../infra/errors/AppError';
import { Password } from '../utils/password';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    if (!token) {
      throw new AppError('You must provide token');
    }

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.userRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    const passwordUtil =  new Password(password) 
    const isPasswordValid = await passwordUtil.isValid()

    if(!isPasswordValid){
      throw new AppError('Password invalid');
    }

   const hashedPassword = await this.hashProvider.generateHash(password);

   await this.userRepository.updatePassword({...user, password: hashedPassword });
  }
}

export default ResetPasswordService;
