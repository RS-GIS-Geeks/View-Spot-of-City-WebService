"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetVisitorByYearMonth(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
    var params = req.query;
    var queryString;
    queryString = "SELECT Visitors.*,ViewSpotData.lng,ViewSpotData.lat,ViewSpotData.name as ViewSpotName \
    FROM Visitors, ViewSpotData" +
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