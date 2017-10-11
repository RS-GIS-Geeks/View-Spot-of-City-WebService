var express = require('express');
var router = express.Router();

var userInfo = require("./viewspot/getuserinfo");
var viewInfo = require("./viewspot/getviewinfo")

router.get("/userinfo", userInfo.GetUserInfo);
router.get("/viewinfo", viewInfo.GetViewInfo);

module.exports = router;