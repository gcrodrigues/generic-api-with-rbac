import { Permissions, Roles, User } from "@prisma/client";
import { v4 } from 'uuid';
import IRolesRepository from "../rolesRepository";
import { CreateRoleDto } from "../../dtos/createRole.dto";
import { UpdateRolePermissionsDto } from "../../dtos/updateRolePermissions";

export type CustomRoles = Roles & {
  permissions?: Permissions[]
  users?: User[]
}

class MockRolesRepository implements IRolesRepository {
  private roles: CustomRoles[] = [];

  public async create({ name, permissions }: CreateRoleDto) {
  const role = {} as CustomRoles

    Object.assign(role, { id: v4(), name, permissions });

    this.roles.push(role);

    return role;
  }

  public async deactivate(role_id: string) {
    this.roles = this.roles.filter(role => role.id !== role_id);
  }

  public async updatePermissions({ id, permissions }: UpdateRolePermissionsDto) {
    const roleIndex = this.roles.findIndex(user => user.id === id);

    const fakePermissions = permissions.map((p, index) => ({
      id: p,
      resource: `Resource ${index}`,
      action: `Action ${index}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    this.roles[roleIndex] = {
      ...this.roles[roleIndex],
      id,
      permissions: fakePermissions
    }

    return this.roles[roleIndex]
  }

  public async findByName(name: string) {
    return this.roles.filter(role => role.name === name)[0]
  } 
  
  public async findAll() {
    return this.roles
  } 

  public async findById(role_id: string) {
    const role = this.roles.find(role => role.id === role_id)!;

    return role
  } 

  public async findPermissionsByRoleId(role_id: string) {
    const role = this.roles.find(role => role.id === role_id)!;

    return role.permissions
  } 
}

export default MockRolesRepository;
