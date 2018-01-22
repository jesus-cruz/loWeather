// Servidor para la app web
var express = require('express');
var mongodb = require('mongodb');

var dbHost = "mongodb://localhost:27017/meteoDB";
var dbObject;

var MongoClient = mongodb.MongoClient;

MongoClient.connect(dbHost, function(err, db){
      if (err) throw err;
      dbObject = db;
      console.log('Conectado a mongo');
});

function getData(responseObj, start, end){

    dbObject.collection("datos").find({hora: {$gte:new Date(start) ,$lt: new Date(end)}}).toArray(function(err, docs){
  
      if (err) throw err;
      var horas = [];
      var temperaturas = [];
      var humedades = [];
      
      for (i in docs){
        var doc = docs[i];
        var h = doc['hora'];
        var t = doc['temp'];
        var hu = doc['hum'];
        horas.push({"label": h});
        temperaturas.push({"value" : t});
        humedades.push({"value" : hu});
      }

      var dataset = [
        {
          "seriesname" : "Temperatura (ºC)",
          "data" : temperaturas
        },
        {
          "seriesname" : "Humedad (%)",
          "data": humedades
        }
      ];

      var response = {
        "dataset" : dataset,
        "categories" : horas
      };
      responseObj.json(response);
    });
}

var app = express();

var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/js', express.static('js'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var start = "2018-01-02T00:00:00.000Z";
var end = "2018-01-03T00:00:00.000Z";
/*
var start = null;
var end = null;
*/
app.get("/dat/", function(req, res){
  if (req.query.min !== undefined){//tiene valor
     start = req.query.min;
  }
  if (req.query.max !== undefined){
     end = req.query.max;
  }
  if(start!==null && end!==null){
    var s=new Date(start);
    var e=new Date(end);
    getData(res, s.toISOString(), e.toISOString());
  }
});

app.get("/", function(req, res){
  res.render("datos");
});

app.listen("3001", function(){
  console.log('Servidor listo: http://localhost:3001');
})
