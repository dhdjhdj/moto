basic.forever(function () {
    Motor.motor(Motorlist.M1, Direction1.Backward, 200)
    Motor.motor(Motorlist.M2, Direction1.Forward, 200)
    LedRgb.rgb_led(LED_rgb_L_R.LED_L, 255, 255, 255)
    LedRgb.rgb_led(LED_rgb_L_R.LED_R, 255,255,255)
})

