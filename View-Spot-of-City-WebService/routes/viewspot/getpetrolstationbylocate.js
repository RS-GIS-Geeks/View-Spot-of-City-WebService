"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetPetrolStationInfoByLocate(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
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