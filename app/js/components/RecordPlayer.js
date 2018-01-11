import $ from '../vendor/zepto'
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
		if (!this.state.playing) {
			return
		}
		if (this.state.paused) {
			this.setState('paused', false)
		} else {
			this.setState('paused', true)
		}
	}

	onNeedleCued() {
		this.setState('playing', true)
		this.setState('animating', false)
	}

	onNeedleReset() {
		this.setState('spinning', false)
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

	stateWillUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			if (typeof this.currentSound !== 'undefined') {
				this.currentSound.audio.stop()
			}
			if (!this.state.currentRecord || this.state.reading) {
				break
			}
			this.elements[this.state.currentRecord].removeClass('show').removeClass('spin')
			break
		default:
			break
		}
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'needleActivated':
			if (value) {
				this.needleCue()
				this.setState('spinning', true)
			} else {
				AudioManager.play('record_noises_end')
				this.needleReset()
			}
			break
		case 'showRadioLightbox':
		case 'showTVLightbox':
			if (value && this.state.playing) {
				this.setState('paused', true)
			} else if (!value && this.state.playing) {
				// this.setState('paused', false)
			}
			break
		case 'playing':
			if (typeof this.state.currentRecord === 'undefined') {
				break
			}
			if (value) {
				AudioManager.play(this.state.currentRecord)
				this.needlePlay()
				this.elements.button.addClass('playing')
			} else {
				if (!this.state.reading) {
					this.setState('animating', true)
				}

				this.setState('paused', false)
				AudioManager.stop(this.state.currentRecord)
				AudioManager.stop('record_noises')
				this.elements.button.removeClass('playing')
				this.elements[this.state.currentRecord].addClass('paused')
				this.setState('needleActivated', false)
			}
			break
		case 'paused':
			if (typeof this.state.currentRecord === 'undefined' || !this.state.playing) {
				break
			}
			if (value) {
				this.timeline.pause()
				AudioManager.pause(this.state.currentRecord)
				this.elements.button.removeClass('playing')
				this.elements[this.state.currentRecord].addClass('paused')
			} else {
				this.timeline.play()
				AudioManager.play(this.state.currentRecord)
				this.elements.button.addClass('playing')
				this.elements[this.state.currentRecord].removeClass('paused')
			}
			break
		case 'recordOnPlayer':
			if (typeof this.state.currentRecord === 'undefined') {
				break
			}
			if (value) {
				this.elements[this.state.currentRecord].addClass('show')
				this.elements.reflection.addClass('show')
				this.currentSound = AudioManager.get(this.state.currentRecord)
			} else {
				this.elements[this.state.currentRecord].removeClass('show').removeClass('spin').removeClass('paused')
				this.elements.reflection.removeClass('show')
			}
			break
		case 'spinning':
			if (typeof this.state.currentRecord === 'undefined') {
				break
			}
			if (value) {
				AudioManager.play('record_noises')
				this.elements[this.state.currentRecord].addClass('spin')
			} else {
				this.elements[this.state.currentRecord].addClass('paused')
				this.setState('recordAngle', this.getCSSRotation($(this.elements[this.state.currentRecord])))
				this.setState('recordOnPlayer', false)
			}
			break
		case 'reading':
			if (value) {
				this.element.addClass('hide-block')
				this.setState('playing', false)
				this.setState('spinning', false)
			} else {
				this.element.removeClass('hide-block')
			}
			break
		default:
			break
		}
	}
}
