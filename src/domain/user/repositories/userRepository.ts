import { Permissions, Roles, User } from "@prisma/client";
import { ChangePasswordDto } from "../dtos/changePassword.dto";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UpdateUserDto } from "../dtos/updateUser.dto";

type CustomUser = User & {
  roles?: Roles[]
}

export default interface IUserRepository {
  create(user: CreateUserDto): Promise<CustomUser>
  deactivate(id: string): void
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<CustomUser | undefined>
  findPermissionsByUserId(user_id: string): Promise<Permissions[] | undefined>
  update(user: UpdateUserDto): Promise<User>
  updatePassword(user: ChangePasswordDto): Promise<User>
}