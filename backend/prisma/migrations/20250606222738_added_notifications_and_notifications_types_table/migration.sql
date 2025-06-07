-- CreateTable
CREATE TABLE `NotificationTypes` (
    `notification_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`notification_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `notification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `read_status` BOOLEAN NOT NULL DEFAULT false,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `read_date` DATETIME(3) NULL,
    `activity_id` INTEGER NULL,
    `user_document_id` INTEGER NULL,
    `reciever_id` INTEGER NOT NULL,
    `notification_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_reciever_id_fkey` FOREIGN KEY (`reciever_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_notification_type_id_fkey` FOREIGN KEY (`notification_type_id`) REFERENCES `NotificationTypes`(`notification_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activities`(`activity_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_user_document_id_fkey` FOREIGN KEY (`user_document_id`) REFERENCES `UserDocuments`(`user_document_id`) ON DELETE SET NULL ON UPDATE CASCADE;
