import serial

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

ard = Arduino('/dev/cu.usbserial-1420', 57600, 1)
while True:
    print("connected")
    light, temp, atm, pressure, ax, ay, az = ard.readdata()
    print("light is " + str(light))
    print("temperature is " + str(temp))
    print("pressure is " + str(atm))
    print("air pressure is " + str(light))
    print("ax ay az " + str(ax)+ str(ay)+ str(az))

