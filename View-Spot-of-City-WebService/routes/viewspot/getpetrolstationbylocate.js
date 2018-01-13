"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetPetrolStationInfoByLocate(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
    var params = req.query;

    var queryString = "SELECT * FROM PetrolStations" +
        " WHERE PetrolStations.Lng > " + params.minLng + " and PetrolStations.Lng < " + params.maxLng +
        " and PetrolStations.Lat > " + params.minLat + " and PetrolStations.Lat < " + params.maxLat + ";";
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

exports.GetPetrolStationInfoByLocate = GetPetrolStationInfoByLocate;