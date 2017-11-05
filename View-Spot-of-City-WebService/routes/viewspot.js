var express = require('express');
var router = express.Router();

var userInfo = require("./viewspot/getuserinfo");
var viewinfobyname = require("./viewspot/getviewbyname");
var viewcountbyneme = require("./viewspot/getviewcountbyname");
var viewinfobylocate = require("./viewspot/getviewbylocate");
var visitorbyyear = require("./viewspot/getvisitorbyyear")

router.get("/userinfo", userInfo.GetUserInfo);
router.get("/viewinfobyname", viewinfobyname.GetViewByName);
router.get("/viewcountbyname", viewcountbyneme.GetViewCountByName);
router.get("/viewinfobylocate", viewinfobylocate.GetViewInfoByLocate);
router.get("/visitorbyyear", visitorbyyear.GetVisitorByYear)

module.exports = router;