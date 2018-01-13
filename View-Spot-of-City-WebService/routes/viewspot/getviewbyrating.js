"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetViewByRating(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
    var params = req.query;

    var queryString = "SELECT * ViewSpotData" +
        " ORDER BY biz_ext_rating " + params.ascordesc + " LIMIT " + params.limit + ";";
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