"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetViewByVisitor(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT  a.Id," +
        "a.Month," +
        "a.ViewId," +   
        "a.Visitors," +
        "a.Year," +
        "name," +
        "lat," +
        "lng From Visitors a INNER JOIN ViewSpotData b ON a.Id = b.id" +
        " ORDER BY a.Visitors DESC LIMIT " + params.limit + ";";
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

exports.GetViewByVisitor = GetViewByVisitor;