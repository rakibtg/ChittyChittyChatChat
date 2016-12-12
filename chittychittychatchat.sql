-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `chat_logs`;
CREATE TABLE `chat_logs` (
  `cl_id` int(11) NOT NULL AUTO_INCREMENT,
  `cl_sender` int(11) DEFAULT NULL,
  `cl_receiver` int(11) DEFAULT NULL,
  `cl_created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cl_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(100) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_password` varchar(100) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_email` (`u_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`u_id`, `u_name`, `u_email`, `u_password`) VALUES
(1,	'Kazi Mehedi Hasan',	'X@gmail.com',	'X'),
(3,	'rakibtg',	'Y@gmail.com',	'Y');

-- 2016-12-12 11:01:02
