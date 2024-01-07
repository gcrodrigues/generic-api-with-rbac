import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {  
  const roleFound = await prisma.roles.findFirst({
    where: {
      name: 'Admin'
    }
  })
  const allPermissions = await prisma.permissions.findMany()
  const allPermissionsId = allPermissions.map(permission => permission.id)
    if(!roleFound?.id) {
      await prisma.roles.create({ 
        data: { 
          name: 'Admin', 
          permissions: {
            connect: allPermissionsId.map(id => ({ id: id})) 
          } 
      } })
    }
}

main()
