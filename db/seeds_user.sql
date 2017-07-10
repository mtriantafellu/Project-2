### user1
INSERT INTO userinfo (`user_name`) VALUES ('user1');
UPDATE `userinfo` SET `user_name` = 'user1' WHERE `id` = '1';
UPDATE `userinfo` SET `user_password` = 'password1' WHERE `id` = '1';
UPDATE `userinfo` SET `wins` = '0' WHERE `id` = '1';
UPDATE `userinfo` SET `losses` = '0' WHERE `id` = '1';

### user2
INSERT INTO userinfo (`user_name`) VALUES ('user1');
UPDATE `userinfo` SET `user_name` = 'user2' WHERE `id` = '2';
UPDATE `userinfo` SET `user_password` = 'password2' WHERE `id` = '2';
UPDATE `userinfo` SET `wins` = '0' WHERE `id` = '2';
UPDATE `userinfo` SET `losses` = '0' WHERE `id` = '2';
