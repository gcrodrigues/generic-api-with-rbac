export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  roles: string[]
}