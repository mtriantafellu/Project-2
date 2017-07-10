### Game schema
### Examples
### INSERT INTO `userinfo` (`user_name`) VALUES ('user1');
### UPDATE `userinfo` SET `user_name` = 'user1' WHERE `id` = '1';

#	`id` int NOT NULL AUTO_INCREMENT,
#	`player_id` int,
#	`game_over` BOOLEAN DEFAULT FALSE,
#    `game_winner` BOOLEAN DEFAULT NULL,
#    PRIMARY KEY (`id`)

INSERT INTO `game` (`player_id`) VALUES ('1');
INSERT INTO `game` (`player_id`) VALUES ('2');