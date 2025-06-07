-- AlterTable
ALTER TABLE `Notifications` ADD COLUMN `visible_researchers` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `visible_students` BOOLEAN NOT NULL DEFAULT true;
