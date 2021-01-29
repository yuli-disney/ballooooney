import serial
import time

with serial.Serial('/dev/tty.usbmodem14201', 115200, timeout=1) as ser:
    while 1:
        data = ser.read() 
        time.sleep(0.1)
        data = data.decode()
        if(data.isdecimal()):
            print(int(data))
            print(type(data))
            data = 0
    
