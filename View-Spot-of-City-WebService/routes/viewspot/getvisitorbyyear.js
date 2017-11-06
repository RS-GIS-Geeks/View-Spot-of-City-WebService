"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetVisitorByYear(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;
    var queryString;
    if(params.year != null && params.viewid != null)
    {
        queryString = "SELECT * FROM Visitors" +
        " WHERE Year = '" + params.year + "'" + " and ViewId = '" + params.viewid + "';";
    }
    else if(params.year == null)
    {
        queryString = "SELECT * FROM Visitors" +
        " WHERE ViewId = '" + params.viewid + "';";
    }
    else
    {
        queryString = "SELECT * FROM Visitors" +
        " WHERE Year = '" + params.year + "';";
    }

    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                VisitorInfo: err.message
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

exports.GetVisitorByYear = GetVisitorByYear;