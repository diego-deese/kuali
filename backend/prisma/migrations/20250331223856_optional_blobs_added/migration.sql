-- AlterTable
ALTER TABLE `Activities` MODIFY `poster_image` BLOB NULL,
    MODIFY `poster_mimetype` VARCHAR(50) NULL,
    MODIFY `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `last_updated` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ActivityAttachedFiles` MODIFY `last_updated` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Requirements` MODIFY `last_updated` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `UserDocuments` MODIFY `upload_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `last_updated` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `profile_photo` BLOB NULL,
    MODIFY `photo_mime_type` VARCHAR(50) NULL;
