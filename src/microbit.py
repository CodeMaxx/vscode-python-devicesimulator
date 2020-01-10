import json
import sys
import os
from adafruit_circuitplayground import utils
from adafruit_circuitplayground import constants as CONSTANTS
from collections import namedtuple

class Image:
    # for all images: https://github.com/micropython/micropython/blob/264d8Falsec84eFalse3454Truebd6e4b46Truebfece4443ffdFalseac/ports/nrf/boards/microbit/modules/microbitconstimage.c
    
    HEART = [
        [False,True,False,True,False],
        [True,True,True,True,True],
        [True,True,True,True,True],
        [False,True,True,True,False],
        [False,False,True,False,False]
    ]

    HEART_SMALL = [
        [False,False,False,False,False],
        [False,True,False,True,False],
        [False,True,True,True,False],
        [False,False,True,False,False],
        [False,False,False,False,False]
    ]

    HAPPY = [
        [False,False,False,False,False],
        [False,True,False,True,False],
        [False,False,False,False,False],
        [True,False,False,False,True],
        [False,True,True,True,False]
    ]

    SMILE = [
        [False,False,False,False,False],
        [False,False,False,False,False],
        [False,False,False,False,False],
        [True,False,False,False,True],
        [False,True,True,True,False]
    ]

    SAD = [
        [False,False,False,False,False],
        [False,True,False,True,False],
        [False,False,False,False,False],
        [False,True,True,True,False],
        [True,False,False,False,True]
    ]

    CONFUSED = [
        [False,False,False,False,False],
        [False,True,False,True,False],
        [False,False,False,False,False],
        [False,True,False,True,False],
        [True,False,True,False,True]
    ]

    ANGRY = [
        [True,False,False,False,True],
        [False,True,False,True,False],
        [False,False,False,False,False],
        [True,True,True,True,True],
        [True,False,True,False,True]
    ]
    
    ASLEEP = [
        [False,False,False,False,False],
        [True,True,False,True,True],
        [False,False,False,False,False],
        [False,True,True,True,False],
        [False,False,False,False,False]
    ]

    SURPRISED = [
        [False,True,False,True,False],
        [False,False,False,False,False],
        [False,False,True,False,False],
        [False,True,False,True,False],
        [False,False,True,False,False]
    ]

    SILLY = [
        [True,False,False,False,True],
        [False,False,False,False,False],
        [True,True,True,True,True],
        [False,False,True,False,True],
        [False,False,True,True,True]
    ]

    FABULOUS = [
        [True,True,True,True,True],
        [True,True,False,True,True],
        [False,False,False,False,False],
        [False,True,False,True,False],
        [False,True,True,True,False]
    ]

    MEH = [
        [False,True,False,True,False],
        [False,False,False,False,False],
        [False,False,False,True,False],
        [False,False,True,False,False],
        [False,True,False,False,False]
    ]

    SPACE = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
    
    Z = [[1,1,1,1,1],
        [0,0,0,1,0],
        [0,0,1,0,0],
        [0,1,0,0,0],
        [1,1,1,1,1]]

    

    Y = [[1,0,0,0,1],
        [0,1,0,1,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0]]

    

    X = [[1,0,0,0,1],
        [0,1,0,1,0],
        [0,0,1,0,0],
        [0,1,0,1,0],
        [1,0,0,0,1]]

    

    W = [[1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,1,0,1],
        [1,0,1,0,1],
        [0,1,0,1,0]]

    


    V = [[1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,0,1,0],
        [0,1,0,1,0],
        [0,0,1,0,0]]

    

    U = [[1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1]]

    

    T = [[1,1,1,1,1],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0]]

    


    S = [[1,1,1,1,1],
        [1,0,0,0,0],
        [1,1,1,1,1],
        [0,0,0,0,1],
        [1,1,1,1,1]]

    


    R = [[1,1,1,1,0],
        [1,0,0,0,1],
        [1,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1]]

    


    Q = [[1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1],
        [0,0,1,0,0]]

    


    P = [[1,1,1,1,0],
        [1,0,0,0,1],
        [1,1,1,1,0],
        [1,0,0,0,0],
        [1,0,0,0,0]]

    


    O = [[0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0]]

    N = [[1,0,0,0,1],
        [1,1,0,0,1],
        [1,0,1,0,1],
        [1,0,0,1,1],
        [1,0,0,0,1]]

    M = [[1,0,0,0,1],
        [1,1,0,1,1],
        [1,0,1,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1]]


    L = [[1,0,0,0,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,1,1,1,1]]



    K = [[1,0,0,0,1],
        [1,0,0,1,0],
        [1,1,1,0,0],
        [1,0,0,1,0],
        [1,0,0,0,1]]



    J = [[0,0,0,1,1],
        [0,0,0,0,1],
        [0,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1]]


    I = [[1,1,1,1,1],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,0,1,0,0],
        [1,1,1,1,1]]


    H = [[1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1]]



    G = [[1,1,1,1,1],
        [1,0,0,0,0],
        [1,0,0,1,1],
        [1,0,0,0,1],
        [1,1,1,1,1]]


    F = [[1,1,1,1,1],
        [1,0,0,0,0],
        [1,1,1,1,0],
        [1,0,0,0,0],
        [1,0,0,0,0]]


    E = [[1,1,1,1,1],
        [1,0,0,0,0],
        [1,1,1,1,0],
        [1,0,0,0,0],
        [1,1,1,1,1]]


    D = [[1,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,0]]


    C = [[1,1,1,1,1],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,0,0,0,0],
        [1,1,1,1,1]]


    B = [[1,1,1,1,1],
        [1,0,0,0,1],
        [1,1,1,1,0],
        [1,0,0,0,1],
        [1,1,1,1,1]]



    A = [[1,1,1,1,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,1,1,1,1],
        [1,0,0,0,1]]


class Microbit:
    def __init__(self):
        # State in the Python process
        self.__state = [
                [False, False, False, False, False],
                [False, False, False, False, False],
                [False, False, False, False, False],
                [False, False, False, False, False],
                [False, False, False, False, False]
            ]

        self.__debug_mode = False
        self.__abs_path_to_code_file = ''

    @property
    def button_a(self):
        return self.__state['button_a']

    @property
    def button_b(self):
        return self.__state['button_b']

    def __show(self):
        utils.show(self.__state, self.__debug_mode, True)
    
    def show(self, image):
        self.__state = image
        self.__show()

    def scroll(self, line):
        flash = [[],[],[],[],[]]
        i = 0
        for i in range(0, len(line)):
            j = i + 1
            t = 0

            while t < 5:
                m = t
                while m < 5:
                    for k in range(0,5):
                        flash[k].append(alphamap[line[i]][k][m])
                    m += 1
                
                if t != 0:
                    for k in range(0,5):
                        flash[k].append(0)

                n = 1
                while n < t:
                    for k in range(0, 5):
                        if j < len(line):
                            flash[k].append(alphamap[line[j]][k][n-1])
                        else:
                            flash[k].append(0)
                    n += 1

                self.show(flash)
                import time
                time.sleep(0.3)
                flash = [[],[],[],[],[]]       
                t += 1
            i += 1

def sleep(sec):
    import time
    time.sleep(sec/1000)

alphamap = {
        " ": Image.SPACE, "A" : Image.A, "B" : Image.B, "C" : Image.C, "D" : Image.D, "E" : Image.E, "F" : Image.F, "G" : Image.G, "H" : Image.H, "I" : Image.I, "J" : Image.J, "K" : Image.K, "L" : Image.L, "M" : Image.M, "N" : Image.N, "O" : Image.O, "P" : Image.P, "Q" : Image.Q, "R" : Image.R, "S" : Image.S, "T" : Image.T, "U" : Image.U, "V" : Image.V, "W" : Image.W, "X" : Image.X, "Y" : Image.Y, "Z" : Image.Z
    }

display = Microbit()