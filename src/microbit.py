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

display = Microbit()