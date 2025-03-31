-- CreateTable
CREATE TABLE `Roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `second_name` VARCHAR(255) NULL,
    `paternal_lastname` VARCHAR(255) NOT NULL,
    `maternal_lastname` VARCHAR(255) NOT NULL,
    `institutional_email` VARCHAR(255) NOT NULL,
    `personal_email` VARCHAR(255) NULL,
    `curp` VARCHAR(18) NULL,
    `profile_photo` BLOB NOT NULL,
    `photo_mime_type` VARCHAR(50) NOT NULL,
    `identifier` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `Users_institutional_email_key`(`institutional_email`),
    UNIQUE INDEX `Users_personal_email_key`(`personal_email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicPrograms` (
    `program_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`program_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscriptions` (
    `inscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `student_id` INTEGER NOT NULL,
    `researcher_id` INTEGER NOT NULL,
    `program_id` INTEGER NOT NULL,

    INDEX `Inscriptions_program_id_idx`(`program_id`),
    INDEX `Inscriptions_student_id_idx`(`student_id`),
    INDEX `Inscriptions_researcher_id_idx`(`researcher_id`),
    PRIMARY KEY (`inscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `location_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activities` (
    `activity_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `event_date` DATETIME(3) NOT NULL,
    `register_date_limit` DATETIME(3) NOT NULL,
    `poster_image` BLOB NOT NULL,
    `poster_mimetype` VARCHAR(50) NOT NULL,
    `mandatory` BOOLEAN NOT NULL,
    `creation_date` DATETIME(3) NOT NULL,
    `last_updated` DATETIME(3) NOT NULL,
    `visible_students` BOOLEAN NOT NULL,
    `visible_researchers` BOOLEAN NOT NULL,
    `admin_creator_id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    UNIQUE INDEX `Activities_admin_creator_id_key`(`admin_creator_id`),
    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirements` (
    `requirement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `last_updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activity_id` INTEGER NOT NULL,

    PRIMARY KEY (`requirement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityAttachedFiles` (
    `activity_attached_file_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `file_content` LONGBLOB NOT NULL,
    `mimetype` VARCHAR(50) NOT NULL,
    `upload_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_updated` DATETIME(3) NOT NULL,
    `activity_id` INTEGER NOT NULL,

    PRIMARY KEY (`activity_attached_file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RevisionStatus` (
    `revision_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`revision_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDocuments` (
    `user_document_id` INTEGER NOT NULL AUTO_INCREMENT,
    `file_name` VARCHAR(255) NOT NULL,
    `file_content` LONGBLOB NOT NULL,
    `mimetype` VARCHAR(50) NOT NULL,
    `upload_date` DATETIME(3) NOT NULL,
    `last_updated` DATETIME(3) NOT NULL,
    `last_reviewed` DATETIME(3) NULL,
    `revision_status_id` INTEGER NOT NULL,
    `registration_id` INTEGER NOT NULL,
    `requirement_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registrations` (
    `registration_id` INTEGER NOT NULL AUTO_INCREMENT,
    `registration_date` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `activity_id` INTEGER NOT NULL,

    INDEX `Registrations_user_id_idx`(`user_id`),
    INDEX `Registrations_activity_id_idx`(`activity_id`),
    PRIMARY KEY (`registration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscriptions` ADD CONSTRAINT `Inscriptions_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscriptions` ADD CONSTRAINT `Inscriptions_researcher_id_fkey` FOREIGN KEY (`researcher_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscriptions` ADD CONSTRAINT `Inscriptions_program_id_fkey` FOREIGN KEY (`program_id`) REFERENCES `AcademicPrograms`(`program_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Locations`(`location_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_admin_creator_id_fkey` FOREIGN KEY (`admin_creator_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirements` ADD CONSTRAINT `Requirements_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityAttachedFiles` ADD CONSTRAINT `ActivityAttachedFiles_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDocuments` ADD CONSTRAINT `UserDocuments_revision_status_id_fkey` FOREIGN KEY (`revision_status_id`) REFERENCES `RevisionStatus`(`revision_status_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDocuments` ADD CONSTRAINT `UserDocuments_requirement_id_fkey` FOREIGN KEY (`requirement_id`) REFERENCES `Requirements`(`requirement_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDocuments` ADD CONSTRAINT `UserDocuments_registration_id_fkey` FOREIGN KEY (`registration_id`) REFERENCES `Registrations`(`registration_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registrations` ADD CONSTRAINT `Registrations_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registrations` ADD CONSTRAINT `Registrations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
