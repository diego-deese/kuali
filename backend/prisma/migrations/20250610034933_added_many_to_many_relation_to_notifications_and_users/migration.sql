/*
  Warnings:

  - You are about to drop the column `read_date` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `read_status` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `reciever_id` on the `Notifications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_reciever_id_fkey`;

-- DropIndex
DROP INDEX `Notifications_reciever_id_fkey` ON `Notifications`;

-- AlterTable
ALTER TABLE `Notifications` DROP COLUMN `read_date`,
    DROP COLUMN `read_status`,
    DROP COLUMN `reciever_id`;

-- CreateTable
CREATE TABLE `NotificationRecievers` (
    `user_id` INTEGER NOT NULL,
    `notification_id` INTEGER NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NotificationRecievers` ADD CONSTRAINT `NotificationRecievers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationRecievers` ADD CONSTRAINT `NotificationRecievers_notification_id_fkey` FOREIGN KEY (`notification_id`) REFERENCES `Notifications`(`notification_id`) ON DELETE CASCADE ON UPDATE CASCADE;
