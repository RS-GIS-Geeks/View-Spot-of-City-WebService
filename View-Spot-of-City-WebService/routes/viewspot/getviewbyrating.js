"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetViewByRating(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT * From ViewSpotOfWuhan.ViewSpotData" +
        " ORDER BY biz_ext_rating DESC LIMIT " + params.limit + ";";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                ViewInfo: err.message
            });
            return;
        }
        else {
            res.json({
                ViewInfo: results
            });
        }
    });
    connection.end();
}

exports.GetViewByRating = GetViewByRating;