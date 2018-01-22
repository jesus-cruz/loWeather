// Servidor para leer los datos que envía la estación
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var http = require('http');

// La dirección y el puerto del servicio mongod
// Windows: C:\Program Files\MongoDB\Server\3.6\bin>mongod 
// Ubuntu:  sudo service mongod start
var url = "mongodb://localhost:27017/";

// El puerto puede cambiarse, pero habría que cambiarlo también en el código del esp
const port = 3000;
var logs;

// Función de espera 
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("meteoDB");
  dbg = db;
  logs = dbo.createCollection("datos", function(err, res) {
    if (err) throw err;
    sleep(2000);
    console.log("Base de datos meteoDB conectada")
    console.log("Coleccion datos creada"); 
    db.close();
  });
}); 

const requestHandler = (request, response) => {
	imprimirMensaje(request.url);
	response.end('Servidor para estacion meteorologica');
}
const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('error', err);
  }
  console.log('Servidor escuchando por el puerto ' + port);
})


function imprimirMensaje(mensaje) {
	if ( mensaje.length != 5){
		return;
	}
	info = new Date() + " Temperatura: " + mensaje.substring(1,3) + 
	 " Humedad: " +  mensaje.substring(3,6);

	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("meteoDB");
	var myobj = { hora: new Date(),temp:  mensaje.substring(1,3), hum:  mensaje.substring(3,6) };
	dbo.collection("datos").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log(info);
	    db.close();
	  });
	}); 
}


