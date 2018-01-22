#include <TinyWireM.h>
#include <SoftwareSerial.h>
#include <SI7021.h>
#include <avr/sleep.h>

#define RX    3   // *** D3, Pin 2
#define TX    4   // *** D4, Pin 3

SI7021 sensor;
int led1 = 3;
int led2 = 4;


SoftwareSerial Serial(RX, TX);

void wakeUpNow(){}


void setup() {
    pinMode(RX, INPUT);
    attachInterrupt(0, wakeUpNow, HIGH);
    sensor.begin();
    Serial.begin(9600);
    Serial.println("Initializing...");
    delay(500);
}

void wait(){
    set_sleep_mode(SLEEP_MODE_PWR_DOWN);    // sleep mode is set here
    sleep_enable();    
    attachInterrupt(0,wakeUpNow, HIGH);    
    sleep_mode();  
    sleep_disable();
    detachInterrupt(0);
}

void loop() {
    si7021_env data = sensor.getHumidityAndTemperature();
    Serial.println(String(data.celsiusHundredths/100)+String(data.humidityBasisPoints/100));   
    wait(); 
}


