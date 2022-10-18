// KEYESTUDIO Microbit Smart Robot Car with Building Blocks
// author: Liu
// github:https://github.com/mworkfun
// Write the date: 2022-10-18

let address = 0x30

/**
 * use for RGB-LED
 */
 enum LED_rgb_L_R
 { 
     //% bolck="LED_R"
     LED_R = 1,
     //% bolck="LED_L"
     LED_L = 0,
 }
/**
 * use for control motor
 */
 enum Motorlist 
 {
     //% block="A"
     M1 = 1,
     //% block="B"
     M2 = 2
 }
 
 enum Direction1 
 {
     //% block="Forward"
     Forward = 1,
     //% block="Backward"
     Backward = 0
 }



//% color="#ff6800" icon="\uf1b9" weight=15
//% groups="['Motor', 'RGB-led', 'Neo-pixel', 'Sensor', 'Tone']"
namespace k_Bit {
 
    //% block="motor = | %motor Direction = | $direction speed = $pwmvalue"
    //% direction.shadow=timePicker
    //% pwmvalue.min=0 pwmvalue.max=255 
    export function motor(motor: Motorlist, direction: Direction1, pwmvalue: number) {
        switch(motor){
            case 1: // M1电机控制
                if (direction) { motor_i2cWrite(0x01,pwmvalue); motor_i2cWrite(0x02, 0);}
                else { motor_i2cWrite(0x02,pwmvalue); motor_i2cWrite(0x01, 0); }
                break;
            case 2: // M2电机控制
                if (direction) { motor_i2cWrite(0x04,pwmvalue); motor_i2cWrite(0x03, 0); }
                else { motor_i2cWrite(0x03,pwmvalue); motor_i2cWrite(0x04, 0); }
                break;
        }
    }

    //% block="RGB = |%place rad   = $arg1 green =$arg2 blue  = $arg3"
    export function led_rgb(place:LED_rgb_L_R,arg1: number, arg2: number,arg3: number) {
        switch(place){
           case 0: {motor_i2cWrite(0x09, arg1);
                    motor_i2cWrite(0x0a, arg2);
                    motor_i2cWrite(0x0b, arg3);} 
                    break;
           case 1: {motor_i2cWrite(0x0c, arg1);
                    motor_i2cWrite(0x0d, arg2);
                    motor_i2cWrite(0x0e, arg3);} 
                    break;
        }

    }
    
    function motor_i2cWrite(reg: number, value: number) 
    {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(address, buf)
    }
}

      /**
     * Ultrasonic sensor
     */
    const TRIG_PIN = DigitalPin.P14;
    const ECHO_PIN = DigitalPin.P15;
    pins.setPull(TRIG_PIN, PinPullMode.PullNone);
    let lastTime = 0;
    //% block="Ultrasonic"
    //% group="Sensor" weight=67
    export function ultra(): number {
        //send trig pulse
        pins.digitalWritePin(TRIG_PIN, 0)
        control.waitMicros(2);
        pins.digitalWritePin(TRIG_PIN, 1)
        control.waitMicros(10);
        pins.digitalWritePin(TRIG_PIN, 0)

        // read echo pulse  max distance : 6m(35000us)
        //2020-7-6 
        // pins.pulseIn():This function has a bug and returns data with large errors.
        let t = pins.pulseIn(ECHO_PIN, PulseValue.High, 35000);
        let ret = t;

        //Eliminate the occasional bad data
        if (ret == 0 && lastTime != 0) {
            ret = lastTime;
        }
        lastTime = t;
        //2020-7-6
        //It would normally divide by 58, because the pins.pulseIn() function has an error, so it's divided by 58
        return Math.round(ret / 40);  
    }
    /**
     * photoresistance sensor
     */
    //% block="photoresistor "
    //% group="Sensor" weight=66
    export function PH(): number {
        return pins.analogReadPin(AnalogPin.P1);  
    }

}
