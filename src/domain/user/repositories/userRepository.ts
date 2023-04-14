import { User } from "@prisma/client";
import { ChangePasswordDto } from "../dtos/changePassword.dto";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";

export default interface IUserRepository {
  create(user: CreateUserDto): Promise<User>;
  deactivate(id: string): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update(user: UpdateUserDto): Promise<User>
  updatePassword(user: ChangePasswordDto): Promise<User>
}