### Turns schema
### Examples
### INSERT INTO `userinfo` (`user_name`) VALUES ('user1');
### UPDATE `userinfo` SET `user_name` = 'user1' WHERE `id` = '1';

#	`id` int NOT NULL AUTO_INCREMENT,
#	`game_id` int NOT NULL AUTO_INCREMENT,
#	`turn_number` int,
#    `winner` BOOLEAN DEFAULT FALSE,
#    `losers` BOOLEAN DEFAULT FALSE,
#    `judge` int DEFAULT '0',
#    PRIMARY KEY (`id`)

INSERT INTO `turns` (`turn_number`) VALUES ('0');
INSERT INTO `turns` (`turn_number`) VALUES ('0');