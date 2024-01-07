import { Permissions } from "@prisma/client";
import IPermissionsRepository from "../permissionsRepository";
import { CreatePermissionDto } from "../../dtos/createPermission.dto";
import { CustomRoles } from "../../../roles/repositories/mocks/mockRolesRepository";
import { v4 } from "uuid";

export type CustomPermissions = Permissions & {
  roles?: CustomRoles[]
}

class MockPermissionsRepository implements IPermissionsRepository {
  private permissions: Permissions[] = [];

  public async create({ action, resource }: CreatePermissionDto): Promise<Permissions> {
    const permission = {} as Permissions

    Object.assign(permission, { id: v4(), action, resource });

    this.permissions.push(permission);

    return permission;
  }

  public async deactivate(permission_id: string) {
    this.permissions = this.permissions.filter(permission => permission.id !== permission_id);
  }
  
  public async findByActionAndResource({ resource, action }: CreatePermissionDto) {
   const permissionFound = this.permissions.find(permission => permission.action === action && permission.resource === resource );
  
   return permissionFound || null
  }

  public async findByRoleId(role_id: string) {
    return this.permissions.filter(permission => permission.id === role_id);
  }

  public async findByUserId(permission_id: string) {
    return this.permissions.filter(permission => permission.id !== permission_id);
  }

  public async findAll() {
    return this.permissions
  }

  public async findById(permission_id: string) {
    return this.permissions.find(permission => permission.id === permission_id) || null;
  }


}

export default MockPermissionsRepository;
