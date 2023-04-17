import { Permissions } from "@prisma/client";
import { CreatePermissionDto } from "../dtos/createPermission.dto";

export default interface IPermissionsRepository {
  create(permission: CreatePermissionDto): Promise<Permissions>
  findByActionAndResource(permission: CreatePermissionDto): Promise<Permissions | null>
  getByRoleId(role_id: string): Promise<Permissions[]>;
}
