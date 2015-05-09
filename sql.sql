SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `oss` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `oss` ;

-- -----------------------------------------------------
-- Table `oss`.`clientes`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`clientes` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(245) NULL ,
  `cpf_cnpj` VARCHAR(245) NULL ,
  `email` VARCHAR(245) NULL ,
  `observacoes` TEXT NULL ,
  `created` DATETIME NULL ,
  `modified` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oss`.`contatos`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`contatos` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(245) NULL ,
  `email` VARCHAR(245) NULL ,
  `situacao` TINYINT NULL ,
  `telefone` VARCHAR(245) NULL ,
  `celular` VARCHAR(245) NULL ,
  `created` DATETIME NULL ,
  `modified` DATETIME NULL ,
  `cliente_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_contatos_clientes_idx` (`cliente_id` ASC) ,
  CONSTRAINT `fk_contatos_clientes`
    FOREIGN KEY (`cliente_id` )
    REFERENCES `oss`.`clientes` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oss`.`produtos`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`produtos` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(245) NULL ,
  `created` DATETIME NULL ,
  `modified` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oss`.`equipamentos`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`equipamentos` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(245) NULL ,
  `descricao` TEXT NULL ,
  `patrimonio` VARCHAR(245) NULL ,
  `created` DATETIME NULL ,
  `modified` DATETIME NULL ,
  `observacoes` TEXT NULL ,
  `cliente_id` INT NOT NULL ,
  `produto_id` INT NOT NULL ,
  `equipamento_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_equipamentos_clientes1_idx` (`cliente_id` ASC) ,
  INDEX `fk_equipamentos_produtos1_idx` (`produto_id` ASC) ,
  INDEX `fk_equipamentos_equipamentos1_idx` (`equipamento_id` ASC) ,
  CONSTRAINT `fk_equipamentos_clientes1`
    FOREIGN KEY (`cliente_id` )
    REFERENCES `oss`.`clientes` (`id` )
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_equipamentos_produtos1`
    FOREIGN KEY (`produto_id` )
    REFERENCES `oss`.`produtos` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipamentos_equipamentos1`
    FOREIGN KEY (`equipamento_id` )
    REFERENCES `oss`.`equipamentos` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oss`.`cardapios`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`cardapios` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `produto_id` INT NOT NULL ,
  `cardapio_id` INT NOT NULL ,
  `qtd` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_cardapios_produtos1_idx` (`produto_id` ASC) ,
  INDEX `fk_cardapios_cardapios1_idx` (`cardapio_id` ASC) ,
  CONSTRAINT `fk_cardapios_produtos1`
    FOREIGN KEY (`produto_id` )
    REFERENCES `oss`.`produtos` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cardapios_cardapios1`
    FOREIGN KEY (`cardapio_id` )
    REFERENCES `oss`.`cardapios` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oss`.`funcionarios`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`funcionarios` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nome` VARCHAR(245) NULL ,
  `email` VARCHAR(245) NULL ,
  `senha` VARCHAR(245) NULL ,
  `created` DATETIME NULL ,
  `modified` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oss`.`ordens`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`ordens` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `data_abertura` DATETIME NULL ,
  `data_finalizado` DATETIME NULL ,
  `valor` FLOAT NULL ,
  `contato_id` INT NOT NULL ,
  `cliente_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ordens_contatos1_idx` (`contato_id` ASC) ,
  INDEX `fk_ordens_clientes1_idx` (`cliente_id` ASC) ,
  CONSTRAINT `fk_ordens_contatos1`
    FOREIGN KEY (`contato_id` )
    REFERENCES `oss`.`contatos` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ordens_clientes1`
    FOREIGN KEY (`cliente_id` )
    REFERENCES `oss`.`clientes` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oss`.`funcionarios_ordens`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `oss`.`funcionarios_ordens` (
  `funcionario_id` INT NOT NULL ,
  `ordem_id` INT NOT NULL ,
  `equipamento_id` INT NOT NULL ,
  `descricao` TEXT NULL ,
  `situacao` TINYINT NULL ,
  `valor` FLOAT NULL ,
  INDEX `fk_funcionarios_ordens_funcionarios1_idx` (`funcionario_id` ASC) ,
  INDEX `fk_funcionarios_ordens_ordens1_idx` (`ordem_id` ASC) ,
  INDEX `fk_funcionarios_ordens_equipamentos1_idx` (`equipamento_id` ASC) ,
  CONSTRAINT `fk_funcionarios_ordens_funcionarios1`
    FOREIGN KEY (`funcionario_id` )
    REFERENCES `oss`.`funcionarios` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_funcionarios_ordens_ordens1`
    FOREIGN KEY (`ordem_id` )
    REFERENCES `oss`.`ordens` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_funcionarios_ordens_equipamentos1`
    FOREIGN KEY (`equipamento_id` )
    REFERENCES `oss`.`equipamentos` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `oss` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
