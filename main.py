basic.show_icon(IconNames.HEART)

def on_forever():
    basic.pause(500)
    pins.i2c_write_number(48, 9, NumberFormat.INT32_BE, True)
    pins.i2c_write_number(48, 1, NumberFormat.INT32_BE, False)
    basic.pause(500)
basic.forever(on_forever)
