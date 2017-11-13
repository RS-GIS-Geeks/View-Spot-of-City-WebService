var express = require('express');
var router = express.Router();

/** 
* 各地图API坐标系统比较与转换; 
* WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系, 
* 谷歌地图采用的是WGS84地理坐标系（中国范围除外）; 
* GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。 
* 谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系; 
* 搜狗坐标系、图吧坐标系等，估计也是在GCJ02基础上加密而成的。 chenhua 
*/ 

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
/**
* 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
* 即 百度 转 谷歌、高德
* @param bd_lon
* @param bd_lat
* @returns {*[]}
*/
function bd09togcj02(bd_lon, bd_lat) 
{ 
　　var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
　　var x = bd_lon - 0.0065;
　　var y = bd_lat - 0.006;
　　var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
　　var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
　　var gg_lng = z * Math.cos(theta);
　　var gg_lat = z * Math.sin(theta);
　　return [gg_lng, gg_lat]
}

/**
* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
* 即谷歌、高德 转 百度
* @param lng
* @param lat
* @returns {*[]}
*/
function gcj02tobd09(lng, lat)
{ 
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    console.log("gcj02tobd09输出经度" + mglng + ",纬度" + mglat);
    return [bd_lng, bd_lat]
}
/**
* WGS84转GCj02
* @param lng
* @param lat
* @returns {*[]}
*/
function wgs84togcj02(lng, lat)
{
    if (out_of_china(lng, lat)) 
    {
        return [lng, lat]
    }
    else 
    {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        console.log("wgs84togcj02输出经度" + mglng + ",纬度" + mglat);
        return [mglng, mglat]
    }
}


/**
* GCJ02 转换为 WGS84
* @param lng
* @param lat
* @returns {*[]}
*/
function gcj02towgs84(lng, lat) 
{
    if (out_of_china(lng, lat)) 
    {
        return [lng, lat]
    }
    else
    {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        console.log("gcj02towgs84输出经度" + (lng * 2 - mglng) + ",纬度" + (lat * 2 - mglat));
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

function transformlat(lng, lat) 
{ 
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformlng(lng, lat) 
{ 
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}
/**
* 判断是否在国内，不在国内则不做偏移
* @param lng
* @param lat
* @returns {boolean}
**/
function out_of_china(lng, lat) 
{ 
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}

router.get("/wgs84togcj02", function GetUserInfo(req, res, next)
{
    var params = req.query;
    var lng = params.lng;
    var lat = params.lat;
    console.log("输入经度" + lng + ",纬度" + lat);
    return wgs84togcj02(lng, lat);
});

router.get("/gcj02towgs84", function GetUserInfo(req, res, next)
{
    try
    {
        var params = req.query;
        var lng = params.lng;
        var lat = params.lat;
        console.log("输入经度" + lng + ",纬度" + lat);
        return gcj02towgs84(lng, lat);
    }
    catch(ex)
    {
        console.log("exception:" + ex);
        return ex;
    }
});

module.exports = router;