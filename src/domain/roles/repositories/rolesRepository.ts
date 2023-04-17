import { Roles } from "@prisma/client";
import { CreateRoleDto } from "../dtos/createRole.dto";

export default interface IRolesRepository {
  create(roles: CreateRoleDto): Promise<Roles>;
  findByName(name: string): Promise<Roles | null>;
  getByUserId(user_id: string): Promise<Roles[]>;
}
