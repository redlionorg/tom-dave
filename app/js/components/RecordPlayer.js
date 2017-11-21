import Component from '../base/Component'
import AudioManager from '../services/AudioManager'
import Enum from '../Enum'

export default class RecordPlayer extends Component {
	constructor(parent) {
		super('.record-player', parent)

		this.cacheDOMElement('button', '.play-button')
		this.cacheDOMElement('needle', '.needle')
		this.cacheDOMElement(Enum.ALBUMS.ABOUT, '.record .about')
		this.cacheDOMElement(Enum.ALBUMS.CONTACT, '.record .contact')
		this.cacheDOMElement(Enum.ALBUMS.WORK, '.record .work')

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

	getCSSRotation(target) {
		const tr = target.css('-webkit-transform') ||
			target.css('-moz-transform') ||
			target.css('-ms-transform') ||
			target.css('-o-transform') ||
			target.css('transform') ||
			undefined
		const values = tr.split('(')[1].split(')')[0].split(',')
		return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
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
				this.elements.needle.addClass('active')
				this.setGlobal('spinning', true)
				setTimeout(() => {
					this.setGlobal('playing', true)
					this.setGlobal('animating', false)
				}, 2000)
			} else {
				this.elements.needle.addClass('reverse').removeClass('active')
				setTimeout(() => {
					this.elements.needle.removeClass('reverse')
					this.setGlobal('spinning', false)
				}, 2000)
			}
			break
		case 'playing':
			if (typeof this.global.currentRecord === 'undefined') {
				break
			}
			if (value) {
				AudioManager.play(this.global.currentRecord)
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
				AudioManager.pause(this.global.currentRecord)
				this.elements.button.removeClass('playing')
				this.elements[this.global.currentRecord].addClass('paused')
			} else {
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
			} else {
				this.elements[this.global.currentRecord].removeClass('show').removeClass('spin').removeClass('paused')
			}
			break
		case 'spinning':
			if (typeof this.global.currentRecord === 'undefined') {
				break
			}
			if (value) {
				this.elements[this.global.currentRecord].addClass('spin')
			} else {
				this.elements[this.global.currentRecord].addClass('paused')
				// const r = this.getCSSRotation(this.elements[this.global.currentRecord])
				// this.setGlobal('recordRotation', r)
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
