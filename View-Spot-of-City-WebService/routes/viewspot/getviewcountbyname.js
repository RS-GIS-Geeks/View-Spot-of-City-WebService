"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetViewCountByName(req, res, next)
{
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
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