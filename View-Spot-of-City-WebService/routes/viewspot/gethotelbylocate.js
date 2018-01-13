"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetHotelInfoByLocate(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
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