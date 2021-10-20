radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        ghost_detected = 1
    }
})
function main_sound () {
    if (ghost_detected) {
        music.startMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once)
    } else {
        music.playTone(988, music.beat(BeatFraction.Whole))
        music.rest(music.beat(BeatFraction.Whole))
    }
}
function setup_radio () {
    radio.setGroup(1)
    radio.setTransmitPower(1)
}
function main_torch () {
    torch_lowbeam()
}
function main_radio () {
    radio.sendNumber(1)
    basic.pause(1000)
}
function setup_torch () {
    ghost_detected = 0
    for (let index = 0; index < 3; index++) {
        basic.pause(1000)
    }
}
function torch_lowbeam () {
    pins.analogWritePin(AnalogPin.P2, 200)
}
function torch_fullbeam () {
    pins.analogWritePin(AnalogPin.P2, 1023)
}
function setup_sound () {
    music.setTempo(120)
    music.setVolume(60)
}
let ghost_detected = 0
basic.showString("T")
setup_radio()
setup_torch()
setup_sound()
basic.forever(function () {
    main_torch()
    main_radio()
    main_sound()
    ghost_detected = 0
})
