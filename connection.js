const mysql = require("mysql2")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Musharraf@12345",
    database: "college"
});

module.exports = {con}