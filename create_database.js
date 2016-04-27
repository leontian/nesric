
var mysql = require('mysql');
var dbconfig = require('./config/db');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'users' + '` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `username` varchar(200) NOT NULL,\
  `email` varchar(200) DEFAULT NULL,\
  `name` varchar(200) DEFAULT NULL,\
  `surname` varchar(200) DEFAULT NULL,\
  `password` varchar(500) NOT NULL,\
  `group` int(11) DEFAULT 1,\
  PRIMARY KEY (`id`),\
  UNIQUE KEY `username` (`username`)\
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'ski_resorts' + '` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(200) NOT NULL,\
  `date` date DEFAULT NULL,\
  `openStatus` tinyint(1) DEFAULT NULL,\
  `acre` int(11) DEFAULT NULL,\
  `trails` int(11) DEFAULT NULL,\
  `address` varchar(200) DEFAULT NULL,\
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
  `version` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'ski_resorts_history' + '` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `name` varchar(200) NOT NULL,\
  `date` date DEFAULT NULL,\
  `openStatus` tinyint(1) DEFAULT NULL,\
  `acre` int(11) DEFAULT NULL,\
  `trails` int(11) DEFAULT NULL,\
  `address` varchar(200) DEFAULT NULL,\
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
  `version` int(11) DEFAULT NULL,\
  PRIMARY KEY (`id`)\
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + 'users_history' + '` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `username` varchar(200) NOT NULL,\
  `email` varchar(200) DEFAULT NULL,\
  `name` varchar(200) DEFAULT NULL,\
  `surname` varchar(200) DEFAULT NULL,\
  `password` varchar(500) NOT NULL,\
  `group` int(11) DEFAULT 1,\
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
  PRIMARY KEY (`id`)\
)');

console.log('Success: Database Created!')

connection.end();
