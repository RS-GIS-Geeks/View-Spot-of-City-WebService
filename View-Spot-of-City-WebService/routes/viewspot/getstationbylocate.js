"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetStationInfoByLocate(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
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