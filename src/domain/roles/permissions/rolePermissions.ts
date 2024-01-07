export enum RolePermissions {
  CREATE_ROLE = 'roles:create',
  LIST_ALL_ROLES = 'roles:read',
  UPDATE_ROLE_PERMISSIONS = 'roles:patch',
  DEACTIVATE_ROLE = 'roles:delete',
  LIST_ROLE_PERMISSIONS = 'roles:list_permissions_by_role_id'
}