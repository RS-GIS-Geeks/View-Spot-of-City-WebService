var express = require('express');
var router = express.Router();

var userInfo = require("./viewspot/getuserinfo");
var viewinfo = require("./viewspot/getviewbyname");
var viewcount = require("./viewspot/getviewcountbyname");

router.get("/userinfo", userInfo.GetUserInfo);
router.get("/viewinfo", viewinfo.GetViewByName);
router.get("/viewcount", viewcount.GetViewCountByName);

module.exports = router;