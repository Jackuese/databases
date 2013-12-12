



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `user_id` INT(10) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `messages` VARCHAR(140) NULL DEFAULT NULL,
  `followers` INT(10) NULL DEFAULT NULL,
  `friends` INT(10) NULL DEFAULT NULL,
  `created` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

-- ---
-- Table 'tweets'
-- 
-- ---

DROP TABLE IF EXISTS `tweets`;
    
CREATE TABLE `tweets` (
  `message_id` INT(15) NOT NULL AUTO_INCREMENT,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`message_id`)
);

-- ---
-- Table 'users.msgs.tweets'
-- 
-- ---

DROP TABLE IF EXISTS `users.msgs.tweets`;
    
CREATE TABLE `users.msgs.tweets` (
  `user_id` INT(10) NOT NULL,
  `message_message_id` INT(15) NOT NULL,
KEY (`user_id`)
);

-- ---
-- Table 'users.followers'
-- 
-- ---

DROP TABLE IF EXISTS `users.followers`;
    
CREATE TABLE `users.followers` (
  `user_id` INT(10) NOT NULL,
  `follower_id` TINYINT NULL DEFAULT NULL,
KEY (`user_id`),
KEY (`follower_id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `users` ADD FOREIGN KEY (user_id) REFERENCES `users.msgs.tweets` (`user_id`);
ALTER TABLE `users` ADD FOREIGN KEY (user_id) REFERENCES `users.followers` (`user_id`);
ALTER TABLE `users.msgs.tweets` ADD FOREIGN KEY (message_message_id) REFERENCES `tweets` (`message_id`);
ALTER TABLE `users.followers` ADD FOREIGN KEY (follower_id) REFERENCES `users` (`user_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `tweets` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users.msgs.tweets` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users.followers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`user_id`,`username`,`messages`,`followers`,`friends`,`created`) VALUES
-- ('','','','','','');
-- INSERT INTO `tweets` (`message_id`,`created`) VALUES
-- ('','');
-- INSERT INTO `users.msgs.tweets` (`user_id`,`message_message_id`) VALUES
-- ('','');
-- INSERT INTO `users.followers` (`user_id`,`follower_id`) VALUES
-- ('','');

