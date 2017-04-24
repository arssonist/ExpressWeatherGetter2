const express = require('express'),
      app     = express(),
      pug     = require('pug'),
      request = require('request')
const bodyParser = require('body-parser'),
      port = process.env.PORT || 8080
    //   compiledFunction = pug.compileFile('template.pug');



// app.use(bodyParser.urlencoded( {extended: true}));
// app.use(bodyParser.json());

//////////////SERVE STATIC//////////////
app.use(express.static(__dirname + '/public'))

/////////VIEW ENGINE//////////
app.set('view engine', 'pug')


///////////////LOCALS- include by name//////////////////////
app.locals.appTitle = "Dogify"


/////////////ROUTES/////////////////
app.use(require('./routes/index.routes'));

//////////////////PORT///////////////////////
app.listen(port);
console.log(`App running on post ${port}`)

module.exports = app
