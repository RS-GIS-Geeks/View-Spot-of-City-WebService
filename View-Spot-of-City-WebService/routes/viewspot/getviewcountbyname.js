"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetViewCountByName(req, res, next)
{
    var connection = mysql.createConnection(db_info.db);
    var params = req.query;

    var queryString = "SELECT COUNT(*) FROM ViewSpotData" + 
    " WHERE name like '" + params.name + "';";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                ViewCount: []
            });
            return;
        }
        else {
            res.json({
                ViewCount: results
            });
        }
    });
    connection.end();
}

exports.GetViewCountByName = GetViewCountByName;