"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetUserInfo(req, res, next)
{
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT * FROM users" + 
    " WHERE mail = " + params.mail;
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                UserInfo: []
            });
            return;
        }
        else {
            res.json({
                UserInfo: results
            });
        }
    });
    connection.end();
}

exports.GetUserInfo = GetUserInfo;