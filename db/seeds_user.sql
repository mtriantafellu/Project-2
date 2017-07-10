### user1
#INSERT INTO `userinfo` (`user_name`) VALUES ('user1');
UPDATE `userinfo` SET `user_name` = 'user1' WHERE `id` = '1';
UPDATE `userinfo` SET `user_password` = 'password1' WHERE `id` = '1';
UPDATE `userinfo` SET `email_address` = 'user1@appToApp.com' WHERE `id` = '1';
UPDATE `userinfo` SET `bio` = 'user1 bio' WHERE `id` = '1';
UPDATE `userinfo` SET `wins` = '0' WHERE `id` = '1';
UPDATE `userinfo` SET `losses` = '0' WHERE `id` = '1';

### user2
#INSERT INTO `userinfo` (`user_name`) VALUES ('user1');
UPDATE `userinfo` SET `user_name` = 'user2' WHERE `id` = '2';
UPDATE `userinfo` SET `user_password` = 'password2' WHERE `id` = '2';
UPDATE `userinfo` SET `email_address` = 'user2@appToApp.com' WHERE `id` = '2';
UPDATE `userinfo` SET `bio` = 'user2 bio' WHERE `id` = '2';
UPDATE `userinfo` SET `wins` = '0' WHERE `id` = '2';
UPDATE `userinfo` SET `losses` = '0' WHERE `id` = '2';
