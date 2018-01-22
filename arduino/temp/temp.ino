const int sensorPin= A0;
 
void setup()
{
  Serial.begin(9600);
  delay(1000);
}

// Print the temperature from the LM35 sensor
void printTemperature()
{
  int value = analogRead(sensorPin);
  float millivolts = (value / 1023.0) * 5000;
  float celsius = millivolts / 10; 
  Serial.print(celsius);
  Serial.print("\n");
}

void loop(void)
{
  printTemperature();
  delay(999);
}

