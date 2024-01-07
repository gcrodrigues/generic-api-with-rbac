import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    { resource: 'roles', action: 'create' },
    { resource: 'roles', action: 'read' },
    { resource: 'roles', action: 'patch' },
    { resource: 'roles', action: 'delete' },
    { resource: 'roles', action: 'list_permissions_by_role_id' },
    
    { resource: 'permissions', action: 'read' },
    { resource: 'permissions', action: 'delete' },
    
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'delete' },
    { resource: 'users', action: 'update' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'list_permissions_by_user_id' },
  ]
  
  permissions.map(async permission => {
    const permissionFound = await prisma.permissions.findFirst({
      where: {
        resource: permission.resource,
        action: permission.action
      }
    })
    
    if(!permissionFound?.id) {
      await prisma.permissions.create({ data: permission })
    }
  })
}

main()
