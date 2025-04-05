/*
  Warnings:

  - You are about to drop the column `researcher_id` on the `Inscriptions` table. All the data in the column will be lost.
  - Added the required column `researcher_id` to the `AcademicPrograms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Inscriptions` DROP FOREIGN KEY `Inscriptions_researcher_id_fkey`;

-- DropIndex
DROP INDEX `Inscriptions_researcher_id_idx` ON `Inscriptions`;

-- AlterTable
ALTER TABLE `AcademicPrograms` ADD COLUMN `researcher_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Inscriptions` DROP COLUMN `researcher_id`;

-- AddForeignKey
ALTER TABLE `AcademicPrograms` ADD CONSTRAINT `AcademicPrograms_researcher_id_fkey` FOREIGN KEY (`researcher_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
