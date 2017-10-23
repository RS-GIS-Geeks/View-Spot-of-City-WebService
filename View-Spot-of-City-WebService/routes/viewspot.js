var express = require('express');
var router = express.Router();

var userInfo = require("./viewspot/getuserinfo");
var viewinfobyname = require("./viewspot/getviewbyname");
var viewcountbyneme = require("./viewspot/getviewcountbyname");
var viewinfobylocate = require("./viewspot/getviewbylocate")

router.get("/userinfo", userInfo.GetUserInfo);
router.get("/viewinfobyname", viewinfobyname.GetViewByName);
router.get("/viewcountbyname", viewcountbyneme.GetViewCountByName);
router.get("/viewinfobylocate", viewinfobylocate.GetViewInfoByLocate)

module.exports = router;