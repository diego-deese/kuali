/*
  Warnings:

  - You are about to drop the `ActivityAttachedFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ActivityAttachedFiles` DROP FOREIGN KEY `ActivityAttachedFiles_activity_id_fkey`;

-- DropTable
DROP TABLE `ActivityAttachedFiles`;

-- CreateTable
CREATE TABLE `RequirementTemplate` (
    `requirement_template_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `file_content` LONGBLOB NOT NULL,
    `mimetype` VARCHAR(50) NOT NULL,
    `upload_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_updated` DATETIME(3) NULL,
    `requirement_id` INTEGER NOT NULL,

    UNIQUE INDEX `RequirementTemplate_requirement_id_key`(`requirement_id`),
    INDEX `RequirementTemplate_requirement_id_fkey`(`requirement_id`),
    PRIMARY KEY (`requirement_template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RequirementTemplate` ADD CONSTRAINT `RequirementTemplate_requirement_id_fkey` FOREIGN KEY (`requirement_id`) REFERENCES `Requirements`(`requirement_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
