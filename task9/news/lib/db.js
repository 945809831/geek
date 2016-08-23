/**
 * Created by PRO on 2016/6/19.
 */
var mysql = require("mysql");

//链接数据库，设置用户名、密码、主机及要打开的数据库
var conn = mysql.createConnection({
    host:     "127.0.0.1",
    user:     "root",
    password: "",
    database: "db1"
});
conn.connect();
module.exports.connection = conn;