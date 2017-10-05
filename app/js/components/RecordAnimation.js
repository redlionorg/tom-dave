import { TimelineLite } from 'gsap'
import Component from '../base/Component'
import Enum from '../Enum'

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

	onAnimationComplete() {
		this.setGlobal('recordOnPlayer', true)
		this.setGlobal('needleActivated', true)
	}

	setTimeline() {
		this.timeline = new TimelineLite({ onComplete: this.onAnimationComplete.bind(this) })
			.to(this.currentAlbum, 1, { x: 0, y: 30, rotation: 90 })
			.to(this.currentRecord, 0, { opacity: 1 })
			.to(this.currentRecord, 1.2, { scale: 0.95, y: 226 })
	}

	animateAlbum() {
		this.timeline.play()
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
				break
			}

			this.currentAlbum.addClass('show')
			this.setTimeline()
			this.animateAlbum()
			break
		case 'recordOnPlayer':
			if (value) {
				this.currentRecord.css('opacity', 0)
			} else {
				this.currentRecord.css('opacity', 1)
			}
			break
		default:
			break
		}
	}
}
