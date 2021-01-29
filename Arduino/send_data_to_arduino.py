import serial
import time

with serial.Serial('/dev/tty.usbmodem14201', 115200, timeout=1) as ser:
    x = ser.read()  
    data = ser.read() 
    while 1:
        time.sleep(1)
        if(data):
            print(data)
            print(type(data))
    
