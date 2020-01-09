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

    // smilies

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