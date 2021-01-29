#include <stdio.h>
#include<Servo.h>
#include "DHT.h"
#include "LIS3DHTR.h"

#ifdef SOFTWAREWIRE
    #include <SoftwareWire.h>
    SoftwareWire myWire(3, 2);
    LIS3DHTR<SoftwareWire> LIS;       //Software I2C
    #define WIRE myWire
#else
    #include <Wire.h>
    LIS3DHTR<TwoWire> LIS;           //Hardware I2C
    #define WIRE Wire
#endif

char res[16];
int light, pressure, atm, temp, ax, ay, az;

DHT dht(3, DHT11);

void setup() {
  Serial.begin(57600);
  dht.begin();
  while (!Serial) {};
  LIS.begin(WIRE, 0x19); //IIC init
  delay(100);
  LIS.setOutputDataRate(LIS3DHTR_DATARATE_50HZ);
}

void loop() {

  //センサから値取得
  if (!LIS) {
    Serial.println("LIS3DHTR didn't connect.");
    while (1);
    return;
  }
  light = analogRead(6);
  temp = dht.readTemperature();
  atm = analogRead(0);
  pressure = analogRead(2);
  ax = LIS.getAccelerationX()*10;
  ay = LIS.getAccelerationY()*10;
  az = LIS.getAccelerationZ()*10;
  
  //文字列にして送信
  sprintf(res, "%d,%d,%d,%d,%d,%d,%d", light, temp, atm, pressure, ax, ay, az);
  Serial.println(res);

  delay(100);
}
