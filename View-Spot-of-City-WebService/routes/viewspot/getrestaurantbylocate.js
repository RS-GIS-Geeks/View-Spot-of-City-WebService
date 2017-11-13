"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetRestaurantInfoByLocate(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT * FROM Restaurants" +
        " WHERE Restaurants.Lng > " + params.minLng + " and Restaurants.Lng < " + params.maxLng +
        " and Restaurants.Lat > " + params.minLat + " and Restaurants.Lat < " + params.maxLat + ";";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                RestaurantInfo: err.message
            });
            return;
        }
        else {
            res.json({
                RestaurantInfo: results
            });
        }
    });
    connection.end();
}

exports.GetRestaurantInfoByLocate = GetRestaurantInfoByLocate;