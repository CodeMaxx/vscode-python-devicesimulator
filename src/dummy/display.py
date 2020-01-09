import json
import sys
import os

from . import utils
from . import constants as CONSTANTS
from collections import namedtuple
from sensors import Acceleration, Bluetooth, Radio

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
>>>>>>> personal/deji/microbitCompile:src/dummy/display.py

class Microbit:
    def __init__(self):
        # State in the Python process
        self.__state = {
            'pixels': [
                [False, False, False, False, False],
                [False, False, False, False, False],
                [False, False, False, False, False],
                [False, False, False, False, False],
                [False, False, False, False, False]
            ],
            'button_a': False,
            'button_b': False,
            'temperature': 0,
            'motion_x': 0,
            'motion_y': 0,
            'motion_z': 0,
            'touch': [False]*7,
            'shake': False,
            'bluetooth': Bluetooth(),
            'radio': Radio(),
            'accelerometer': Acceleration(
                                            x: self._state["motion_x"],
                                            y: self._state["motion_y"],
                                            z: self._state["motion_z"]
                                        ),
            'compass': 0.0,
            'pins': (0, 0, 0 ,0, 0)
        }
        self.__debug_mode = False
        self.__abs_path_to_code_file = ''

    @property
    def acceleration(self):
        return self.__state['acclerometer']

    @property
    def button_a(self):
        return self.__state['button_a']

    @property
    def button_b(self):
        return self.__state['button_b']

    def __show(self):
        utils.show(self.__state, self.__debug_mode)
    
    def show(self, image):
        self.__state = {
            'pixels': image
        }
        self.__show(self)

    def adjust_touch_threshold(self, adjustement):
        """Not implemented!
        The Pacifica Simulator doesn't use capacitive touch threshold.
        """
        telemetry_py.send_telemetry("ADJUST_THRESHOLD")
        raise NotImplementedError(
            CONSTANTS.NOT_IMPLEMENTED_ERROR)

    def shake(self, shake_threshold=30):
        return self.__state['shake']

    def play_file(self, file_name):
        file_name = utils.remove_leading_slashes(file_name)
        abs_path_parent_dir = os.path.abspath(
            os.path.join(self.__abs_path_to_code_file, os.pardir))
        abs_path_wav_file = os.path.normpath(
            os.path.join(abs_path_parent_dir, file_name))
        abs_path_wav_file = utils.escape_if_OSX(abs_path_wav_file)

        if sys.implementation.version[0] >= 3:
            if file_name.endswith(".wav"):
                try:
                    playsound(abs_path_wav_file)
                except:
                    # TODO TASK: 29054 Verfication of a "valid" .wav file
                    raise EnvironmentError(CONSTANTS.NOT_SUITABLE_FILE_ERROR)
            else:
                raise TypeError(file_name + " is not a path to a .wav file.")
        else:
            raise NotImplementedError("Please use Python 3 or higher.")

    def play_tone(self, frequency, duration):
        """ Not Implemented!
        """
        raise NotImplementedError(
            CONSTANTS.NOT_IMPLEMENTED_ERROR)

    def start_tone(self, frequency):
        """ Not Implemented!
        """
        raise NotImplementedError(
            CONSTANTS.NOT_IMPLEMENTED_ERROR)

    def stop_tone(self):
        """ Not Implemented!
        """
        raise NotImplementedError(
            CONSTANTS.NOT_IMPLEMENTED_ERROR)

display = Microbit()
