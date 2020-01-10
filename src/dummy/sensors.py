class Bluetooth:
    def __init__(self):
        self.on = False
        self.macaddress = '46.F8.DG.9F.6D'
        self.remembered_devices = []
        self.connected_device = ""
    
    def connect(self, device):
        if self.connected_device != device:
            self.connected_device = device
    
    def disconnect(self):
        if self.connected_device != "":
            self.connected_device = ""

    def show_remembered_devices(self):
        return self.remembered_devices

class Radio:
    def __init_(self):
        self.on = True
        self.station = "100.0"

    def change_station(self, station):
        if self.station != station:
            self.station = station

    def tune_up(self):
        self.station += 0.1

    def tune_down(self):
        self.station -= 0.1

    def list_valid_stations(self):
        return ["90.0", "91.4", "94.6", "107.4"]

class Acceleration:
    def __init_(self):
        for kw,arg in kwargs.iteritems():
            setattr(self, kw, arg)
    
    def return_x(self):
        if self.x != None:
            return self.x
    
    def return_y(self):
        if self.y != None:
            return self.y
    
    def return_z(self):
        if self.z != None:
            return self.z