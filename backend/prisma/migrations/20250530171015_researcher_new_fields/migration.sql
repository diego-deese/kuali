/*
  Warnings:

  - A unique constraint covering the columns `[employeeNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[socialSecurityNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `categoriaProfr` VARCHAR(20) NULL,
    ADD COLUMN `cvuNumber` VARCHAR(8) NULL,
    ADD COLUMN `employeeNumber` VARCHAR(8) NULL,
    ADD COLUMN `namingNumber` VARCHAR(13) NULL,
    ADD COLUMN `namingType` VARCHAR(20) NULL,
    ADD COLUMN `placementType` VARCHAR(50) NULL,
    ADD COLUMN `researchLine` VARCHAR(255) NULL,
    ADD COLUMN `sniDistinction` VARCHAR(20) NULL,
    ADD COLUMN `socialSecurityNumber` VARCHAR(255) NULL,
    ADD COLUMN `validity` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_employeeNumber_key` ON `Users`(`employeeNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Users_socialSecurityNumber_key` ON `Users`(`socialSecurityNumber`);
