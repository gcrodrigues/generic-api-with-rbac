import { injectable, inject } from 'tsyringe';
import path from 'path';
import IUserTokensRepository from '../repositories/userTokensRepository';
import AppError from '../../../infra/errors/AppError';
import IUserRepository from '../repositories/userRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exists', 401);
    }

    const { token } = await this.userTokensRepository.generate(
      checkUserExists.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: checkUserExists.name,
        email: checkUserExists.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: checkUserExists.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
