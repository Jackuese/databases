
DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE `users` (
  `user_id` INT(10) NOT NULL AUTO_INCREMENT,
  `name`    VARCHAR(250) NOT NULL,
  `room_id` INT(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

DROP TABLE IF EXISTS messages;

CREATE TABLE `messages` (
  `message_id` INT(10) NOT NULL AUTO_INCREMENT,
  `room_id`    INT(10) DEFAULT NULL,
  `content`    VARCHAR(250) NOT NULL,
  `user_id`    INT(10),
  `date`       DATETIME,
  PRIMARY KEY (`message_id`)
);

CREATE TABLE `rooms` (
  `room_id`         INT(10) NOT NULL AUTO_INCREMENT,
  `message_id` INT(10),
  `roomname`        VARCHAR(250) NOT NULL,
  PRIMARY KEY (`room_id`)
);

CREATE TABLE `friends` (
  `user_id`   INT(10),
  `friend_id` INT(10),
  KEY (`user_id`),
  KEY (`friend_id`)
);

CREATE TABLE `user_messages` (
  `user_id` INT(10),
  `message_id` INT(10),
  KEY (`user_id`)
);

CREATE TABLE `room_messages` (
  `room_id` INT(10),
  `message_id` INT(10) NOT NULL,
  KEY (`room_id`)
);

ALTER TABLE `room_messages` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`room_id`);
ALTER TABLE `room_messages` ADD FOREIGN KEY (message_id) REFERENCES `messages` (`message_id`);
ALTER TABLE `user_messages` ADD FOREIGN KEY (message_id) REFERENCES `messages` (`message_id`);
ALTER TABLE `user_messages` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `friends` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `friends` ADD FOREIGN KEY (friend_id) REFERENCES `users` (`user_id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`room_id`);
ALTER TABLE `messages` ADD FOREIGN KEY (user_id) REFERENCES `users` (`user_id`);
ALTER TABLE `rooms` ADD FOREIGN KEY (message_id) REFERENCES `messages` (`message_id`);
ALTER TABLE `users` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`room_id`);

insert into rooms (roomname) values ('fifty') ;
insert into rooms (roomname) values (3) ;
insert into rooms (roomname) values ('fifty') ;


|  | int(10)      | NO   | PRI | NULL    | auto_increment |
|     | int(10)      | YES  | MUL | NULL    |                |
|     | varchar(250) | NO   |     | NULL    |                |
|     | int(10)      | YES  | MUL | NULL    |                |
| date       | datetime     | YES  |     | NULL    |                |


insert into messages (room_id,content,user_id) values (1, 'these are my balls, don"t eat them', 1);


