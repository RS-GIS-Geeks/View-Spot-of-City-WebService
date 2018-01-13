"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetViewByVisitor(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
    var params = req.query;

    var queryString = "SELECT  a.Id," +
        "a.Month," +
        "a.ViewId," +   
        "a.Visitors," +
        "a.Year," +
        "lat," +
        "lng, name as 'ViewSpotName' From Visitors a INNER JOIN ViewSpotData b ON a.Id = b.id " +
        "where a.Month=" + params.month + " and a.Year=" + params.year + 
        " ORDER BY a.Visitors DESC LIMIT " + params.limit + ";";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                ViewInfo: err.message + "[" + queryString + "]"
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

exports.GetViewByVisitor = GetViewByVisitor;