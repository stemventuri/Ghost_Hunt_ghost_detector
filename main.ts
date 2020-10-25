function torch_fade () {
    light_level = [8, 6, 8, 2, 4]
    for (let level of light_level) {
        pins.analogWritePin(AnalogPin.P2, level * 100)
        basic.pause(1000)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        ghost_detected = 1
        basic.showString("" + (radio.receivedPacket(RadioPacketProperty.SerialNumber)))
    }
})
function main_game () {
    game.addScore(1)
}
function torch_flash () {
    light_level = [10, 0]
    for (let level2 of light_level) {
        pins.analogWritePin(AnalogPin.P2, level2 * 100)
        basic.pause(100)
    }
}
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
    if (ghost_detected) {
        torch_lowbeam()
        if (Math.randomBoolean()) {
            torch_flash()
        } else {
            torch_fade()
        }
    }
    torch_fade()
}
function main_radio () {
    radio.sendNumber(1)
    basic.pause(1000)
}
function setup_torch () {
    ghost_detected = 0
    for (let index = 0; index < 3; index++) {
        torch_flash()
        basic.pause(1000)
    }
}
input.onButtonPressed(Button.AB, function () {
    setup_new_game()
})
function torch_lowbeam () {
    pins.analogWritePin(AnalogPin.P2, 200)
}
function setup_new_game () {
    game.setScore(0)
}
function torch_fullbeam () {
    pins.analogWritePin(AnalogPin.P2, 1023)
}
function setup_sound () {
    music.setTempo(120)
    music.setVolume(60)
}
let ghost_detected = 0
let light_level: number[] = []
setup_radio()
setup_torch()
setup_sound()
setup_new_game()
basic.forever(function () {
    main_radio()
    main_sound()
    main_torch()
    ghost_detected = 0
})
