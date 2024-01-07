import { Permissions } from "@prisma/client";
import { CreatePermissionDto } from "../dtos/createPermission.dto";

export default interface IPermissionsRepository {
  create(permission: CreatePermissionDto): Promise<Permissions>
  deactivate(permission_id: string): Promise<void>
  findByActionAndResource(permission: CreatePermissionDto): Promise<Permissions | null>
  findAll(): Promise<Permissions[]>;
  findById(permission_id: string): Promise<Permissions | null>
}
