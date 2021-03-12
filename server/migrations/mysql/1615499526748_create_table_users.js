module.exports = {
    "up": "CREATE TABLE `users` (`id` int(11) NOT NULL, `username` varchar(32) NOT NULL, `firstName` varchar(32)" +
        " NOT NULL, `lastName` varchar(32) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    "down": "DROP TABLE users;"
}
