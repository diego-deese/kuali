-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `hashedToken` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `expireAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RefreshToken_id_key`(`id`),
    UNIQUE INDEX `RefreshToken_hashedToken_key`(`hashedToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
