var express = require('express');
var router = express.Router();

var userInfo = require("./viewspot/getuserinfo");

router.get("/userinfo", userInfo.GetUserInfo);

module.exports = router;