const express = require('express'),
      router = express.Router(),
      weatherMiddleware = require('../middlewares/weather.middleware')


router.get('/', weatherMiddleware.respondWeather)

module.exports = router;
