import { Roles } from "@prisma/client";

export default interface IRolesRepository {
  getByUserId(user_id: string): Promise<Roles[]>;
}
