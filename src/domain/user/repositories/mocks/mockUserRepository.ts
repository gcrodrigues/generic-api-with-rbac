import { Permissions, User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/createUser.dto";

import { v4 } from 'uuid';

import IUserRepository from '../userRepository';
import { ChangePasswordDto } from "../../dtos/changePassword.dto";
import { CustomRoles } from "../../../roles/repositories/mocks/mockRolesRepository";

type CustomUser = User & {
  roles?: CustomRoles[]
}

class MockUserRepository implements IUserRepository {
  private users: CustomUser[] = [];

  public async create({
    password,
    name,
    email,
    roles
  }: CreateUserDto): Promise<User> {
    const user = {} as User

    Object.assign(user, { id: v4(), email, password, name, roles });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string) {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findById(id: string) {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async update(user: User) {
    const findIndex = this.users.findIndex(user => user.id === user.id)!;

    this.users[findIndex] = user

    return user
  }

  public async deactivate(id: string) {
    this.users = this.users.filter(user => user.id !== id)
  } 
  
  public async updatePassword({ id, password}: ChangePasswordDto) {
    const findIndex = this.users.findIndex(user => user.id === id)!;

    this.users[findIndex].password = password

    return this.users[findIndex]
  } 

  public async findPermissionsByUserId(user_id: string) {
    const user = this.users.find(user => user.id === user_id)!;

    let permissions: Permissions[] = []
    user.roles?.forEach(role => role.permissions?.forEach(permisssion => permissions.push(permisssion)))

    return permissions
    
  }
}

export default MockUserRepository;
