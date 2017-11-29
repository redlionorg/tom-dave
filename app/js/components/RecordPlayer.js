import Component from '../base/Component'
import AudioManager from '../services/AudioManager'
import Enum from '../Enum'

const CSSPlugin = require('../../../node_modules/gsap/CSSPlugin.js')
const TimelineLite = require('../../../node_modules/gsap/TimelineLite.js')

export default class RecordPlayer extends Component {
	constructor(parent) {
		super('.record-player', parent)

		this.cacheDOMElement('button', '.play-button')
		this.cacheDOMElement('needle', '.needle')
		this.cacheDOMElement(Enum.ALBUMS.ABOUT, '.record .about')
		this.cacheDOMElement(Enum.ALBUMS.CONTACT, '.record .contact')
		this.cacheDOMElement(Enum.ALBUMS.WORK, '.record .work')
		this.cacheDOMElement('reflection', '.record .reflection')
		this.currentSound = undefined

		this.elements.button.on('click', this.onButtonClick.bind(this))
	}

	onButtonClick() {
		if (!this.global.playing) {
			return
		}
		if (this.global.paused) {
			this.setGlobal('paused', false)
		} else {
			this.setGlobal('paused', true)
		}
	}

	onNeedleCued() {
		this.setGlobal('playing', true)
		this.setGlobal('animating', false)
	}

	onNeedleReset() {
		this.setGlobal('spinning', false)
	}

	getCSSRotation(target) {
		const tr = target.css('-webkit-transform') ||
			target.css('-moz-transform') ||
			target.css('-ms-transform') ||
			target.css('-o-transform') ||
			target.css('transform') ||
			undefined

		if (typeof tr === 'undefined' || tr === 'none') {
			return 0
		}
		console.log(tr)
		const values = tr.split('(')[1].split(')')[0].split(',')
		return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
	}

	needlePlay() {
		this.timeline = new TimelineLite()
			.to(this.elements.needle, this.currentSound.audio.duration(), { rotation: '35deg' })
		this.timeline.play()
	}

	needleCue() {
		this.timeline = new TimelineLite()
			.to(this.elements.needle, 2, { rotation: '22deg' })
			.add(this.onNeedleCued.bind(this))
		this.timeline.play()
	}

	needleReset() {
		this.timeline = new TimelineLite()
			.to(this.elements.needle, 2, { rotation: '0deg' })
			.add(this.onNeedleReset.bind(this))
		this.timeline.play()
	}

	globalWillUpdate(param) {
		switch (param) {
		case 'currentRecord':
			if (!this.global.currentRecord || this.global.reading) {
				break
			}
			this.elements[this.global.currentRecord].removeClass('show').removeClass('spin')
			break
		default:
			break
		}
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'needleActivated':
			if (value) {
				this.needleCue()
				this.setGlobal('spinning', true)
			} else {
				this.needleReset()
			}
			break
		case 'showRadioLightbox':
		case 'showTVLightbox':
			if (value && this.global.playing) {
				this.setGlobal('paused', true)
			} else if (!value && this.global.playing) {
				this.setGlobal('paused', false)
			}
			break
		case 'playing':
			if (typeof this.global.currentRecord === 'undefined') {
				break
			}
			if (value) {
				AudioManager.play(this.global.currentRecord)
				this.needlePlay()
				this.elements.button.addClass('playing')
			} else {
				if (!this.global.reading) {
					this.setGlobal('animating', true)
				}

				AudioManager.stop(this.global.currentRecord)
				this.elements.button.removeClass('playing')
				this.elements[this.global.currentRecord].addClass('paused')
				this.setGlobal('needleActivated', false)
			}
			break
		case 'paused':
			if (typeof this.global.currentRecord === 'undefined') {
				break
			}
			if (value) {
				this.timeline.pause()
				AudioManager.pause(this.global.currentRecord)
				this.elements.button.removeClass('playing')
				this.elements[this.global.currentRecord].addClass('paused')
			} else {
				this.timeline.play()
				AudioManager.play(this.global.currentRecord)
				this.elements.button.addClass('playing')
				this.elements[this.global.currentRecord].removeClass('paused')
			}
			break
		case 'recordOnPlayer':
			if (typeof this.global.currentRecord === 'undefined') {
				break
			}
			if (value) {
				this.elements[this.global.currentRecord].addClass('show')
				this.elements.reflection.addClass('show')
				this.currentSound = AudioManager.get(this.global.currentRecord)
			} else {
				this.elements[this.global.currentRecord].removeClass('show').removeClass('spin').removeClass('paused')
				this.elements.reflection.removeClass('show')
			}
			break
		case 'spinning':
			if (typeof this.global.currentRecord === 'undefined') {
				break
			}
			if (value) {
				AudioManager.play('record_noises')
				this.elements[this.global.currentRecord].addClass('spin')
			} else {
				this.elements[this.global.currentRecord].addClass('paused')
				this.setGlobal('recordAngle', this.getCSSRotation($(this.elements[this.global.currentRecord])))
				this.setGlobal('recordOnPlayer', false)
			}
			break
		case 'reading':
			if (value) {
				this.$.addClass('hide-block')
				this.setGlobal('playing', false)
				this.setGlobal('spinning', false)
			} else {
				this.$.removeClass('hide-block')
			}
			break
		default:
			break
		}
	}
}
