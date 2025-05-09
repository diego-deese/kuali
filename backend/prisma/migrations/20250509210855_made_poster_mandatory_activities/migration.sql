/*
  Warnings:

  - Made the column `poster_image` on table `Activities` required. This step will fail if there are existing NULL values in that column.
  - Made the column `poster_mimetype` on table `Activities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Activities` MODIFY `poster_image` MEDIUMBLOB NOT NULL,
    MODIFY `poster_mimetype` VARCHAR(50) NOT NULL;
