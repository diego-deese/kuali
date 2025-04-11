-- DropForeignKey
ALTER TABLE `Activities` DROP FOREIGN KEY `Activities_admin_creator_id_fkey`;

-- DropIndex
DROP INDEX `Activities_admin_creator_id_key` ON `Activities`;

-- AddForeignKey
-- ALTER TABLE `AcademicPrograms` ADD CONSTRAINT `AcademicPrograms_researcher_id_fkey` FOREIGN KEY (`researcher_id`) REFERENCES `Users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
