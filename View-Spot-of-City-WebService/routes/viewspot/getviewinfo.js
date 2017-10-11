"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetViewInfo(req, res, next) {
    var connection = mysql.createConnection({
        host: "139.129.166.245",
        port: 3306,
        user: "admin",
        password: "admin",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT * FROM ViewSpotData" +
        " WHERE ViewSpotData.lng > " + params.minLng + " and ViewSpotData.lng < " + params.maxLng +
        " and ViewSpotData.lat > " + params.minLat + " and ViewSpotData.lat < " + params.maxLat;
        "and pname = " + params.pName + " and cityname = " + params.cityName ;
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

exports.GetViewInfo = GetViewInfo;