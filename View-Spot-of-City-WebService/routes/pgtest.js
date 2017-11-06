var express = require('express');
var router = express.Router();
var pg = require('pg');

var conString = "postgres://postgres:****@**.***.***.***/View-Spot-of-City";
var client = new pg.Client(conString);
client.connect();
client.query('INSERT INTO users(name) VALUES($1)', ['陶春生']);

router.get("/test", function(req, res)
{
    query = client.query('SELECT COUNT(*) AS n FROM users');
    query.on('row', function(result) 
    {
        console.log(result);
        if (!result) 
        {
            return res.send('No data found');  
        } 
        else 
        {
            res.send('Visits today: ' + result.n);  
        }
    });
});

module.exports = router;