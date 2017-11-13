"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetVisitorByYearMonth(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;
    var queryString;
    queryString = "SELECT Visitors.*,ViewSpotData.lng,ViewSpotData.lat,ViewSpotData.name as ViewSpotName \
    FROM ViewSpotOfWuhan.Visitors,ViewSpotOfWuhan.ViewSpotData" +
    " WHERE Visitors.ViewId = ViewSpotData.id AND Visitors.Year = '" + params.year + 
    "'" + " AND Visitors.Month = '" + params.month + "' \
    order by ViewSpotData.biz_ext_rating limit " + params.limit + ";";

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

exports.GetVisitorByYearMonth = GetVisitorByYearMonth;