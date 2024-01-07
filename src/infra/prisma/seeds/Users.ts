import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {  
  const userFound = await prisma.user.findFirst({
    where: {
      email: process.env.ADMIN_EMAIL!,
    }
  })

  const adminRole = await prisma.roles.findFirst({
    where: {
      name: 'Admin'
    }
  })

  if(!userFound?.id) {
    await prisma.user.create({ 
      data: { 
        email: process.env.ADMIN_EMAIL!,
        name: 'Admin',
        password: '$2a$08$WZf4hx78ABILWZm.MKsx/Oo470kXyRQoDz0jb9g/dYKGRsfcsd4wu',
        roles: {
          connect: [
            { id: adminRole?.id }
          ]
        }
      }
    })
  }
}

main()
