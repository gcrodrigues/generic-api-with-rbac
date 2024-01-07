import { Roles, Permissions } from "@prisma/client";
import { CreateRoleDto } from "../dtos/createRole.dto";
import { UpdateRolePermissionsDto } from "../dtos/updateRolePermissions";

export default interface IRolesRepository {
  create(roles: CreateRoleDto): Promise<Roles>
  deactivate(role_id: string): void
  updatePermissions(role: UpdateRolePermissionsDto): Promise<Roles>
  findPermissionsByRoleId(role_id: string): Promise<Permissions[] | undefined>
  findByName(name: string): Promise<Roles | null>
  findAll(): Promise<Roles[]>
  findById(role_id: string): Promise<Roles | null>
}
