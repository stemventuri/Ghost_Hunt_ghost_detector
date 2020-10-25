def on_forever():
    a = [10,9,8,7,6,5]
    for value in a:
        pins.analog_write_pin(AnalogPin.P0, (value * 100))
        basic.pause(200)
basic.forever(on_forever)
