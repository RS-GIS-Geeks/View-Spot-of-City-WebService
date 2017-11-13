"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetViewInfo(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
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
                ViewInfo: []
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