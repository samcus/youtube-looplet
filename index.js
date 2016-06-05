const express = require("express"),
favicon = require('express-favicon'),
app = express();

NODE_ENV="production";

app.use(favicon(__dirname + '/favicon.png'));

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
  res.render('home.ejs',{});
  next();
});

app.get('*',function(req,res,next){
  if(!res.headerSent){
    if(res.status(404)){
      res.render('404.ejs',{
        location: "404"
      });
    }
  }
});

app.listen(process.env.PORT || 8003, function () {
  console.log('Example app listening on port', process.env.PORT );
});
