-- CreateTable
CREATE TABLE `cotizacion` (
    `id_cotizacion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_servicio` INTEGER NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mensaje` VARCHAR(250) NULL,
    `fecha_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Cotizacion_id_servicio_fkey`(`id_servicio`),
    PRIMARY KEY (`id_cotizacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicio` (
    `id_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` LONGBLOB NULL,
    `nombre_servicio` VARCHAR(191) NOT NULL,
    `descripcion_servicio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cotizacion` ADD CONSTRAINT `Cotizacion_id_servicio_fkey` FOREIGN KEY (`id_servicio`) REFERENCES `servicio`(`id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
