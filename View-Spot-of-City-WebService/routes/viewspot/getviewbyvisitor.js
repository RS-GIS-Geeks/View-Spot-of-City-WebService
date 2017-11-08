"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetViewByVisitor(req, res, next) {
    var connection = mysql.createConnection({
        host: "39.108.171.209",
        port: 3306,
        user: "rsgisgeeks",
        password: "1506geeks",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT  a.Id," +
        "a.Month," +
        "a.ViewId," +   
        "a.Visitors," +
        "a.Year," +
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