"use strick"
exports.__esModule = true;
var mysql = require("mysql");

function GetCommentByViewid(req, res, next) {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "admin1997",
        database: "ViewSpotOfWuhan"
    });
    var params = req.query;

    var queryString = "SELECT * From ViewSpotOfWuhan.Comments" +
        " WHERE SpotId = '" + params.viewid + "'" +
        " ORDER BY Year DESC ,Month DESC ,Day DESC ;";
    connection.query(queryString, function (err, results) {
        if (err) {
            res.json({
                CommentInfo: err.message
            });
            return;
        }
        else {
            res.json({
                CommentInfo: results
            });
        }
    });
    connection.end();
}

exports.GetCommentByViewid = GetCommentByViewid;