import { Howl } from 'howler'
import Observer from '../base/Observer'

class _AudioManager extends Observer {
	constructor() {
		super()
		this.sounds = {}
	}

	add(tag, path) {
		const sound = {
			id: tag,
			playing: false
		}
		const howl = new Howl({ src: path, onend: this.onEnd.bind(this, sound) })
		sound.audio = howl

		this.sounds[tag] = sound
	}

	play(tag) {
		if (tag in this.sounds && !this.sounds[tag].playing) {
			const sound = this.sounds[tag]
			sound.audio.play()
			sound.playing = true
			this.emit('play', [sound])
		}
	}

	stop(tag) {
		if (tag in this.sounds && this.sounds[tag].playing) {
			const sound = this.sounds[tag]
			sound.audio.stop()
			sound.playing = false
			this.emit('stop', [sound])
		}
	}

	pause(tag) {
		if (tag in this.sounds && this.sounds[tag].playing) {
			const sound = this.sounds[tag]
			sound.audio.pause()
			sound.playing = false
			this.emit('pause', [sound])
		}
	}

	onEnd(sound) {
		this.emit('end', [sound])
	}
}

const AudioManager = new _AudioManager()
export default AudioManager
