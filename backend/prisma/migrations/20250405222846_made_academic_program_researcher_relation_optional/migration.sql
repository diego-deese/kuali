-- DropForeignKey
ALTER TABLE `AcademicPrograms` DROP FOREIGN KEY `AcademicPrograms_researcher_id_fkey`;

-- DropIndex
DROP INDEX `AcademicPrograms_researcher_id_fkey` ON `AcademicPrograms`;

-- AlterTable
ALTER TABLE `AcademicPrograms` MODIFY `researcher_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `AcademicPrograms` ADD CONSTRAINT `AcademicPrograms_researcher_id_fkey` FOREIGN KEY (`researcher_id`) REFERENCES `Users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
