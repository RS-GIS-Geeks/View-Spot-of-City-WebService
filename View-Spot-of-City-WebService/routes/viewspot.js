var express = require('express');
var router = express.Router();

var userInfo = require("./viewspot/getuserinfo");
var viewinfobyname = require("./viewspot/getviewbyname");
var viewcountbyneme = require("./viewspot/getviewcountbyname");
var viewinfobylocate = require("./viewspot/getviewbylocate");
var visitorbyyear = require("./viewspot/getvisitorbyyear");
var viewbyvisitor = require("./viewspot/getviewbyvisitor");
var viewbyrating = require("./viewspot/getviewbyrating");
var viewbycost = require("./viewspot/getviewbycost")
var visitorbyyearmonth = require("./viewspot/getvisitorbyyearmonth")
var commentbyviewid = require("./viewspot/getcommentbyviewid")
var stationinfobylocate = require("./viewspot/getstationbylocate")
var hotelinfobylocate = require("./viewspot/gethotelbylocate")
var restaurantinfobylocate = require("./viewspot/getrestaurantbylocate")

router.get("/userinfo", userInfo.GetUserInfo);
router.get("/viewinfobyname", viewinfobyname.GetViewByName);
router.get("/viewcountbyname", viewcountbyneme.GetViewCountByName);
router.get("/viewinfobylocate", viewinfobylocate.GetViewInfoByLocate);
router.get("/visitorbyyear", visitorbyyear.GetVisitorByYear);
router.get("/viewbyvisitor", viewbyvisitor.GetViewByVisitor);
router.get("/viewbyrating", viewbyrating.GetViewByRating);
router.get("/viewbycost", viewbycost.GetViewByCost)
router.get("/visitorbyyearmonth", visitorbyyearmonth.GetVisitorByYearMonth)
router.get("/commentbyviewid", commentbyviewid.GetCommentByViewid)
router.get("/stationinfobylocate", stationinfobylocate.GetStationInfoByLocate)
router.get("/hotelinfobylocate", hotelinfobylocate.GetHotelInfoByLocate)
router.get("/restaurantinfobylocate", restaurantinfobylocate.GetRestaurantInfoByLocate)

module.exports = router;