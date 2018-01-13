"use strick"
exports.__esModule = true;
var mysql = require("mysql");
var db_info = require("./database.config")

function GetCommentByViewid(req, res, next) {
    var connection = mysql.createConnection(db_info.db);
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