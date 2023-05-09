-- CreateTable
CREATE TABLE "Roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RolesToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_PermissionsToRoles" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RolesToUser_AB_unique" ON "_RolesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RolesToUser_B_index" ON "_RolesToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionsToRoles_AB_unique" ON "_PermissionsToRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionsToRoles_B_index" ON "_PermissionsToRoles"("B");

-- AddForeignKey
ALTER TABLE "_RolesToUser" ADD CONSTRAINT "_RolesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolesToUser" ADD CONSTRAINT "_RolesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRoles" ADD CONSTRAINT "_PermissionsToRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
