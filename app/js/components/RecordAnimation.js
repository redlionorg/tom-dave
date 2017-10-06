import Component from '../base/Component'
import Enum from '../Enum'

const CSSPlugin = require('../../../node_modules/gsap/CSSPlugin.js')
const TimelineLite = require('../../../node_modules/gsap/TimelineLite.js')

export default class RecordAnimation extends Component {
	constructor(parent) {
		super('.record-animation', parent)

		this.cacheDOMElement('albumAbout', '.album .about')
		this.cacheDOMElement('albumContact', '.album .contact')
		this.cacheDOMElement('albumWork', '.album .work')
		this.cacheDOMElement('recordAbout', '.record .about')
		this.cacheDOMElement('recordContact', '.record .contact')
		this.cacheDOMElement('recordWork', '.record .work')

		this.currentAlbum = undefined
		this.currentRecord = undefined
	}

	onAlbumAnimatedDown() {
		this.setGlobal('recordOnPlayer', true)
		this.setGlobal('needleActivated', true)
	}

	onAlbumAnimatedUp() {
		this.setGlobal('currentRecord', undefined)
		this.setGlobal('animating', false)
	}

	setTimeline() {
		this.timeline = new TimelineLite({
			onComplete: this.onAlbumAnimatedDown.bind(this),
			onReverseComplete: this.onAlbumAnimatedUp.bind(this)
		}, CSSPlugin)
			.to(this.currentAlbum, 1, { x: 0, y: 30, rotation: 90 })
			.to(this.currentRecord, 0, { opacity: 1 })
			.to(this.currentRecord, 1.2, { scale: 0.95, y: 226 })
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			switch (value) {
			case Enum.ALBUMS.ABOUT:
				this.currentAlbum = this.elements.albumAbout
				this.currentRecord = this.elements.recordAbout
				break
			case Enum.ALBUMS.WORK:
				this.currentAlbum = this.elements.albumWork
				this.currentRecord = this.elements.recordWork
				break
			case Enum.ALBUMS.CONTACT:
				this.currentAlbum = this.elements.albumContact
				this.currentRecord = this.elements.recordContact
				break
			default:
				this.currentAlbum.removeClass('show')
				// this.elements.recordContainer.css('transform', 'initial')
				this.currentAlbum = undefined
				this.currentRecord = undefined
				break
			}

			if (typeof value !== 'undefined') {
				this.setTimeline()
				this.currentAlbum.addClass('show')
				this.timeline.play()
			}
			break
		case 'recordOnPlayer':
			if (!this.currentRecord) {
				break
			}
			if (value) {
				this.currentRecord.css('opacity', 0)
			} else {
				// rotate(${this.global.recordRotation || 0}deg)
				// this.elements.recordContainer.css('transform', ``)
				this.currentRecord.css('opacity', 1)
				this.timeline.reverse()
			}
			break
		default:
			break
		}
	}
}
