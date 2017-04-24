const request = require('request')
module.exports = {
    getIP:(req,res,next)=> {
      console.log(`${req.method} request for '${req.url}' - ${req.body.user_info_field}`);

      var ip = req.ip;

      // make call to page get ip from  user

      // have to hard code IP, when not using localhost, this would be uncommented
      var localhosts = ["localhost", "::1"];
      if (localhosts.indexOf(req.ip) >= 0) {
      // if index is 0 or above then the value is in array
      // console.log(req.ip)

        // hardcode ip
        ip = "104.251.99.162"
      }

    //I HAD HELP HERE///////////////
      //input field value
      if (req.body.user_info_field) {
        if ( req.body.user_info_field.match(/\d+\.\d+\.\d+\.\d+/g)){
          // it looks like an ip
          ip = req.body.user_info_field;
        } else {
          // assuming input to be a city
          req.customCity = req.body.user_info_field;

        }
      }
      // var ip = req.ip
      console.log('IP:', ip);

    // call ip-api
      request(`http://ip-api.com/json/${ip}`,function (error, response, body){

    //put the entire body back into the req object, then can be used later.
        req.ipinfo = JSON.parse(body); //if req is string, it needs to be parsed
        console.log('IPINFO', req.ipinfo)
        next();
      })
    },
    apiCall:(req,res,next) => {
      // req.ipinfo
        // console.log('IPINFO:', typeof req.ipinfo, req.ipinfo);

    //if customCity is present use customCity, else use ipinfo.city
        var cityName = req.customCity ? req.customCity : req.ipinfo.city;
        console.log('CITY:', cityName);

        if(!cityName){
          next();
          return;
        }
    // syntax= url + ?q={location}&APPID={api_key}
        var api_key = "28c8970fb188f02790725eac3d906263";
        request(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${api_key}`,function(error, response,body){
        req.weatherInfo = JSON.parse(body)

        // res.send(req.weatherInfo.name)
        console.log(req.weatherInfo)
          next();
        })

    },
    test:{

    },
    respondWeather:(req, res) => {
      res.send({
        "City Name": !!req.weatherInfo && req.weatherInfo.name,
        "Current Conditions": req.weatherInfo.weather[0].main,
        "Description": req.weatherInfo.weather[0].description,
        "Temp":req.weatherInfo.main.temp,
        "Humidity":req.weatherInfo.main.humidity,

        "Min Temp":req.weatherInfo.main.temp_min,
        "Max Temp":req.weatherInfo.main.temp_max
        })
    }
}
