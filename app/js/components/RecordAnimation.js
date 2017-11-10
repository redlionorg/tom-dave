import Component from '../base/Component'
import WindowSize from '../services/WindowSize'
import Enum from '../Enum'
import UserAgent from '../services/UserAgent'

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
		this.currentAlbumImage = undefined
		this.currentRecord = undefined
		this.animatedDown = false
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
		let yOffset = 0

		if (UserAgent.isMobile()) {
			yOffset = 172
		} else {
			if (WindowSize.height >= 950) {
				yOffset = 330
			} else {
				yOffset = 226
			}
		}

		const xOrigin = this.currentAlbum.position().left

		this.timeline = new TimelineLite({
			onReverseComplete: this.onAlbumAnimatedUp.bind(this)
		}, CSSPlugin)
			.to(this.currentAlbum, 1, { x: 0, y: 30, rotation: 90, boxShadow: '11px -8px 8px -2px rgba(0, 0, 0, 0.3) ' })
			.to(this.currentRecord, 0, { opacity: 1 })
			.to(this.currentRecord, 1.2, { scale: 0.95, y: yOffset })
			.add(() => {
				if (!this.animatedDown) {
					this.onAlbumAnimatedDown()
					this.animatedDown = true
				} else {
					this.animatedDown = false
				}
			})
			.to(this.currentAlbum, 1, { x: xOrigin, y: 0, rotation: 0, boxShadow: '11px 8px 8px -2px rgba(0, 0, 0, 0.3) ' })
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			if (this.global.reading) {
				break
			}

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
