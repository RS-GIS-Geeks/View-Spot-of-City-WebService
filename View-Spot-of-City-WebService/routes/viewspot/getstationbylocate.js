"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetStationInfoByLocate(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT * FROM TransportStations" +
        " WHERE TransportStations.Lng > " + params.minLng + " and TransportStations.Lng < " + params.maxLng +
        " and TransportStations.Lat > " + params.minLat + " and TransportStations.Lat < " + params.maxLat + ";";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                StationInfo: queryString
            });
            return;
        }
        else {
            res.json({
                StationInfo: results
            });
        }
    });
    connection.end();
}

exports.GetStationInfoByLocate = GetStationInfoByLocate;