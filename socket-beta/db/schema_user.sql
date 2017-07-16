### Schema_user

CREATE DATABASE `appToApp_db`;
USE `appToApp_db`;

CREATE TABLE `userinfo`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`user_name` varchar(255),
	`user_password` varchar(255),
	`email_address` varchar(255),
    `bio` varchar(255),
    `wins` int,
    `losses` int,
    `login_history` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `game`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`player_id` int,
	`game_over` BOOLEAN DEFAULT FALSE,
    `game_winner` BOOLEAN DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `turns`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`game_id` int NOT NULL,
	`turn_number` int,
    `winner` BOOLEAN DEFAULT FALSE,
    `losers` BOOLEAN DEFAULT FALSE,
    `judge` int DEFAULT '0',
    PRIMARY KEY (`id`)
);

CREATE TABLE `adjectives`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`adjective` varchar(255),
	`description` varchar(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE `nouns`
(
	`id` int NOT NULL AUTO_INCREMENT,
	`noun` varchar(255),
	`description` varchar(255),
    PRIMARY KEY (`id`)
);

SELECT * FROM `userinfo`;
SELECT * FROM `game`;
SELECT * FROM `turns`;
SELECT * FROM `adjectives`;
SELECT * FROM `nouns`;