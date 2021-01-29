import serial
import requests
import json
import time


names = ['kamiya', 'ohira', 'kakukawa', 'kito']
name = names[0] #自分で変更して下さい

class Arduino:
    ser = None

    def __init__(self, COM, speed, timeout):
        self.ser = serial.Serial(COM, speed, timeout = timeout)
        self.ser.readline()

    def __del__(self):
        self.ser.close()

    def readdata(self):
        string_data = ""
        while True:
            line = self.ser.readline().decode()
            if line:
                string_data = line
                string_data = string_data.replace('\r\n', '')
                break
        
        try:
            light_s, temp_s, atm_s, pressure_s, ax_s, ay_s, az_s = string_data.split(',')
            light = int(light_s)
            temp = int(temp_s)
            atm = int(atm_s)
            pressure = int(pressure_s)
            ax = int(ax_s)
            ay = int(ay_s)
            az = int(az_s)
            return [light, temp, atm, pressure, ax, ay, az]
        except ValueError:
            return self.readdata()
    
    def motor1(self, deg):
        self.ser.write(b'1')
        self.ser.write(bytes([deg]))
    
    #追加
    #二つ目のモータ制御、引数に0~180を指定
    def motor2(self, deg):
        self.ser.write(b'2')
        self.ser.write(bytes([deg]))

def send_to_aws(light, temp, atm, pressure, ax, ay, az):
    data = {
        "name" : name,
        "light" : light,
        "temperature" : temp,
        "pres" : atm,
        "ax" : ax,
        "ay" : ay,
        "az" : az,
        "air_pres" : pressure
    }
    print(str(light) + " " + str(temp) + " " + str(atm) + " " + str(pressure) + " "+ str(ax) + " " + str(ay) + " " + str(az))
    json_data = json.dumps(data)
    response = requests.post('https://sceb33h64f.execute-api.ap-northeast-1.amazonaws.com/default//mechatronics_data', json_data)
    return response.text



ard = Arduino('/dev/cu.usbserial-1410', 57600, 1) #自分で変更して下さい
while True:
    print("connected")
    light, temp, atm, pressure, ax, ay, az = ard.readdata()
    response = send_to_aws(light, temp, atm, pressure, ax, ay, az)
    time.sleep(0.2) #DBの費用を抑えるために間隔を広げています、本番は取っ払います
    # key = input()
    # if key == 'l':
    #     ard.motor1(40)
    #     print("l pushed")
    # elif key == 'k':
    #     ard.motor1(0)
    #     print("k pushed")
    # elif key == 'j':
    #     ard.motor2(180)
    # elif key == 'h':
    #     ard.motor2(90)
