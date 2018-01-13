"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetUserInfo(req, res, next)
{
    var connection = mysql.createConnection(db_info.db);
    var params = req.query;

    var queryString = "SELECT * FROM Users" + 
    " WHERE Mail = '" + params.mail + "';";
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