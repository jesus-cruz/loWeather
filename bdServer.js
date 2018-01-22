// Script para probar la bd
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("mydb");
  dbo.createCollection("logs", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 
 
function imprimirMensaje(mensaje) {
	if ( mensaje.length != 5){
		return;
	}
	info = new Date() + " Temperatura: " + mensaje.substring(1,3) + 
	 " Humedad: " +  mensaje.substring(3,6);
	console.log(info)
  	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("mydb");
  		var myobj = { temp: String(mensaje.substring(1,3)), hum: String(mensaje.substring(3,6)) };
  		dbo.collection("logs").insertOne(myobj, function(err, res) {
    	if (err) throw err;
   	 	console.log("1 document inserted");
    	db.close();
  });
}); 
   
}

