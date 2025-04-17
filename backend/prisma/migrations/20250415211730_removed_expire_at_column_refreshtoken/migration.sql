/*
  Warnings:

  - You are about to drop the column `expireAt` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `RefreshToken` DROP COLUMN `expireAt`;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_admin_creator_id_fkey` FOREIGN KEY (`admin_creator_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
