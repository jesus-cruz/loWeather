// Versión para flashear, sin serial
     
#include <ESP8266WiFi.h>

// Estas variables cambiarán dependiendo de la wifi y del servidor al que queremos conectarnos
const char* ssid     = "_____";
const char* password = "_____";     
const char* host = "_________";
const int httpPort = 3000;

int wifiStatus;
String data = "00";
int temp = 0;
int hum  = 0;

WiFiClient client;

void setup() { 
  Serial.begin(9600);                               // El serial es utilizado por el sensor si702
  delay(200);
      
  WiFi.begin(ssid, password);   
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  //checkConnection();                              //En esta versión no imprimiremos información por el serial
  Serial.println("conectado");
}   
     
void loop() {
  Serial.println("1");

  while (!Serial) { }
  if ( Serial.available()) {
    data = (Serial.readString()).substring(0,4);    // Hay que eliminar el \n
    Serial.print(data);
    if (client.connect(host, 3000)) {
      client.println("GET /" + data);
      client.println();
    } 
  }
  ESP.deepSleep(10e6); // unos 10 segundos

}

/**
 * Función para comprobar el estado de la conexión, devolverá datos de interés para debugear usando el serial
 */
void checkConnection(){
  wifiStatus = WiFi.status();
  if(wifiStatus == WL_CONNECTED){
    Serial.println("");
    Serial.println("Your ESP is connected!");  
    Serial.println("Your IP address is: ");
    Serial.println(WiFi.localIP());  
  }
  else{
    Serial.println("");
    Serial.println("WiFi not connected");
  }

  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  } else {
    Serial.println("connection success");
  }
}

