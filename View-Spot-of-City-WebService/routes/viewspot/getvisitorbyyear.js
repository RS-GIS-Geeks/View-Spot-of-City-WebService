"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetVisitorByYear(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
    var params = req.query;
    var queryString;
    if(params.year != null && params.viewid != null)
    {
        queryString = "SELECT Visitors.*,ViewSpotData.lng,ViewSpotData.lat \
        FROM ViewSpotOfWuhan.Visitors,ViewSpotOfWuhan.ViewSpotData" +
        " WHERE Visitors.ViewId = ViewSpotData.id AND Visitors.Year = '" + params.year + 
        "'" + " AND Visitors.ViewId = '" + params.viewid + "';";
    }
    else if(params.year == null)
    {
        queryString = "SELECT Visitors.*,ViewSpotData.lng,ViewSpotData.lat \
        FROM ViewSpotOfWuhan.Visitors,ViewSpotOfWuhan.ViewSpotData" +
        " WHERE Visitors.ViewId = ViewSpotData.id " + " AND Visitors.ViewId = '" + params.viewid + "';";
    }
    else
    {
        queryString = "SELECT Visitors.*,ViewSpotData.lng,ViewSpotData.lat \
        FROM ViewSpotOfWuhan.Visitors,ViewSpotOfWuhan.ViewSpotData" +
        " WHERE Visitors.ViewId = ViewSpotData.id AND Visitors.Year = '" + params.year + "';";
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