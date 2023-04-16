import { Permissions } from "@prisma/client";

export default interface IPermissionsRepository {
  getByRoleId(role_id: string): Promise<Permissions[]>;
}
