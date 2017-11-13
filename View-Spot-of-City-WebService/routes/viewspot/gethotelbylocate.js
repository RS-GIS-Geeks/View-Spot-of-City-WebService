"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetHotelInfoByLocate(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT * FROM Hotels" +
        " WHERE Hotels.Lng > " + params.minLng + " and Hotels.Lng < " + params.maxLng +
        " and Hotels.Lat > " + params.minLat + " and Hotels.Lat < " + params.maxLat + ";";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                HotelInfo: err.message
            });
            return;
        }
        else {
            res.json({
                HotelInfo: results
            });
        }
    });
    connection.end();
}

exports.GetHotelInfoByLocate = GetHotelInfoByLocate;