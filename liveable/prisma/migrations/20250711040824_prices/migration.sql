-- CreateTable
CREATE TABLE `companies` (
    `company_id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(100) NOT NULL,
    `sector` VARCHAR(100) NOT NULL,
    `loc_state` CHAR(2) NOT NULL,

    INDEX `loc_state`(`loc_state`),
    PRIMARY KEY (`company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_prices` (
    `loc_state` CHAR(2) NOT NULL,
    `median_house_price` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`loc_state`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `job_id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER NOT NULL,
    `job_title` VARCHAR(100) NOT NULL,
    `job_description` TEXT NULL,
    `loc_city` VARCHAR(100) NULL,
    `loc_state` CHAR(2) NOT NULL,
    `min_salary` DECIMAL(10, 2) NULL,
    `max_salary` DECIMAL(10, 2) NULL,
    `avg_salary` DECIMAL(10, 2) NULL,
    `is_hourly` BOOLEAN NOT NULL,

    INDEX `company_id`(`company_id`),
    INDEX `idx_jobs_state_city`(`loc_state`, `loc_city`),
    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mortgage_rates` (
    `loc_state` CHAR(2) NOT NULL,
    `loan_term_years` INTEGER NOT NULL,
    `date_recorded` DATE NOT NULL,
    `annual_interest_rate` DECIMAL(5, 2) NOT NULL,

    PRIMARY KEY (`loc_state`, `loan_term_years`, `date_recorded`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_info` (
    `username` VARCHAR(20) NOT NULL,
    `salt` CHAR(8) NOT NULL,
    `password_hash` BINARY(64) NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`loc_state`) REFERENCES `home_prices`(`loc_state`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies`(`company_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_loc_state_fkey` FOREIGN KEY (`loc_state`) REFERENCES `home_prices`(`loc_state`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mortgage_rates` ADD CONSTRAINT `mortgage_rates_ibfk_1` FOREIGN KEY (`loc_state`) REFERENCES `home_prices`(`loc_state`) ON DELETE CASCADE ON UPDATE CASCADE;
