module.exports = {
    "up": "INSERT INTO `users` (`id`, `username`, `firstName`, `lastName`) VALUES\n" +
        "(1, 'nimda', 'nimda', 'nimda');",
    "down": "DELETE FROM users WHERE id='1'"
}