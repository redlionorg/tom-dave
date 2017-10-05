import Component from '../base/Component'
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

	}

	startSpinning() {
		this.setGlobal('spinning', true)
	}

	startPlaying() {
		this.setGlobal('playing', true)
		this.setGlobal('animating', false)
	}

	globalWillUpdate(param) {
		switch (param) {
		case 'currentRecord':
			if (!this.global.currentRecord) {
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
				this.startSpinning()
				setTimeout(() => {
					this.startPlaying()
				}, 2000)
			} else {
				this.elements.needle.removeClass('active')
			}
			break
		case 'playing':
			if (value) {
				this.elements.button.addClass('playing')
			} else {
				this.elements.button.removeClass('playing')
			}
			break
		case 'recordOnPlayer':
			this.elements[Enum.ALBUMS.ABOUT].removeClass('show').removeClass('spin')
			this.elements[Enum.ALBUMS.WORK].removeClass('show').removeClass('spin')
			this.elements[Enum.ALBUMS.CONTACT].removeClass('show').removeClass('spin')

			this.elements[this.global.currentRecord].addClass('show')
			break
		case 'spinning':
			if (value) {
				this.elements[this.global.currentRecord].addClass('spin')
			} else {
				this.elements[this.global.currentRecord].removeClass('spin')
			}
			break
		default:
			break
		}
	}
}
