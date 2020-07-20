#include "DHT.h"

#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11

#define PULSADOR 3
#define PIEZO 8
#define LED_VERDE 9
#define LED_ROJO 10
#define LUCES 13

String cadena_in = "";        
bool cadenaCompleta = false;
int alarma = 0;

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(PULSADOR, INPUT_PULLUP);
  pinMode(PIEZO, OUTPUT);
  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LUCES, OUTPUT);
}

void loop() {
  if (cadenaCompleta) {
    Serial.println(cadena_in);
    decodificar();
    cadena_in = "";
    cadenaCompleta = false;
  }

  if (alarma){
    analogWrite(LED_ROJO, 125);
    analogWrite(LED_VERDE, 0);
    tone(PIEZO, 440, 50);
    delay(100);
  }

  if (!alarma){
    analogWrite(LED_ROJO, 0);
    analogWrite(LED_VERDE, 125);
  }

  if (digitalRead(PULSADOR)){
      alarma = 1;
  }
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    cadena_in += inChar;
    if (inChar == '\n') {
      cadenaCompleta = true;
    }
  }
}

void decodificar(void) {
    int inicio, fin, longitud, nivel_bat;
    boolean valido = true;
    String comando;
    inicio = cadena_in.indexOf(':') + 1;    //The index of val within the String, or -1 if not found.
    fin = cadena_in.indexOf('%')-1; 
    comando = cadena_in.substring(0,4);
  

    if (comando == "DATA") {
        float h = dht.readHumidity();
        float t = dht.readTemperature();
        float f = dht.readTemperature(true);

        int pot = analogRead(5);
        pot = map(pot, 0, 1024, 0, 150);
        int gabinete = digitalRead(PULSADOR);

        float hif = dht.computeHeatIndex(f, h);
        float hic = dht.computeHeatIndex(t, h, false);

        Serial.print(F("Humidity: "));
        Serial.print(h);
        Serial.print(F("%  Temperature: "));
        Serial.print(t);
        Serial.print(F("°C "));
        Serial.print(f);
        Serial.print(F("°F"));
        Serial.print("  Viento: ");
        Serial.print(pot);
        Serial.println("KM/H");
        Serial.print("GAB:");
        Serial.println(alarma);
    }
    if (comando == "ALAO"){
        alarma = 1;
    }
    if (comando == "ALAF"){
        alarma = 0;
    }
    if (comando == "LUCO"){
          digitalWrite(LUCES, HIGH);
    }
    if (comando == "LUCF"){
          digitalWrite(LUCES, LOW);
    }
}