-- CreateTable
CREATE TABLE `controle_acesso_wpp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_json` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('pendente', 'aberta') NOT NULL DEFAULT 'pendente',
    `id_ca` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
