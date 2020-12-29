CREATE SCHEMA IF NOT EXISTS `tin`;

CREATE TABLE IF NOT EXISTS `tin`.`Vet`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `lastName` VARCHAR(50) NOT NULL ,
      `email` VARCHAR(50) NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `vet_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin`.`Spec`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `name` VARCHAR(50) NOT NULL ,
      `minSalary` DECIMAL(10,2) UNSIGNED NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `spec_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin`.`SpecVet`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `price` DECIMAL(10,2) UNSIGNED NOT NULL ,
      `dateFrom` DATE NOT NULL ,
      `vet_id` INT UNSIGNED NOT NULL ,
      `spec_id` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `SpecVet_id_UNIQUE` (`_id` ASC),
      CONSTRAINT `vet_fk` FOREIGN KEY (`vet_id`) REFERENCES `tin`.`Vet` (`_id`),
      CONSTRAINT `spec_fk` FOREIGN KEY (`spec_id`) REFERENCES `tin`.`Spec` (`_id`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;



INSERT IGNORE INTO `tin`.`Vet` (`_id`, `firstName`, `lastName`, `email`) VALUES
  (1, 'Michał', 'Karta', 'michal.karta@petwet.pl'),
  (2, 'Adam', 'Wetkowski', 'adam.wetkowski@petwet.pl'),
  (3, 'Krystian', 'Buczek', 'krystian.buczek@petwet.pl'),
  (4, 'Magdalena', 'Jasek', 'm.jasek@petwet.pl'),
  (5, 'Maja', 'Jodła', 'm.jodła@petwet.pl')
;

INSERT IGNORE INTO `tin`.`Spec` (`_id`, `name`, `minSalary`) VALUES
  (1, 'Interna', 4000),
  (2, 'Ortopedia', 6000),
  (3, 'Okulistyka', 5500),
  (4, 'Chirurgia ogólna', 8000),
  (5, 'Kardiologia', 7000),
  (6, 'Nefrologia', 8000),
  (7, 'Stomatologia', 6500)
;

INSERT IGNORE INTO `tin`.`SpecVet` (`_id`, `vet_id`, `spec_id`, `price`, `dateFrom`) VALUES
  (1, 1, 1, 45, '2004-10-01'),
  (2, 2, 4, 150, '2010-02-01'),
  (3, 1, 3, 70, '2009-07-10')
;