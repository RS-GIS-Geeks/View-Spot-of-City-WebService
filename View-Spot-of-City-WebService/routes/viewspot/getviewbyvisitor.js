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
        "lat as 'Lat'," +
        "lng as 'Lng', name as 'ViewSpotName' From Visitors a INNER JOIN ViewSpotData b ON a.Id = b.id " +
        "where a.Month=" + params.month + " and a.Year=" + params.year + 
        " ORDER BY a.Visitors DESC LIMIT " + params.limit + ";";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                VisitorInfo: err.message + "[" + queryString + "]"
            });
            return;
        }
        else {
            res.json({
                VisitorInfo: results
            });
        }
    });
    connection.end();
}

exports.GetViewByVisitor = GetViewByVisitor;