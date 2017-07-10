### Schema_user

CREATE DATABASE userinfo_db;
USE userinfo_db;

CREATE TABLE userinfo
(
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255),
	user_password varchar(255),
    wins int,
    losses int,
    login_history int,
	PRIMARY KEY (id)
);

SELECT * FROM userinfo