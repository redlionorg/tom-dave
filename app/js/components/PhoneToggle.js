import Component from '../base/Component'
import { UserAgent } from '../services'

const CSSPlugin = require('../../../node_modules/gsap/CSSPlugin.js')
const TimelineLite = require('../../../node_modules/gsap/TimelineLite.js')

export default class PhoneToggle extends Component {
	constructor(parent) {
		super('.phoneToggle', parent)
		this.cacheDOMElement('phone', '.phone')
		this.element.on('click', this.onPhoneClick.bind(this))

		console.log('Phone toggle is working') // this
	}

	onPhoneClick() {
		if ((UserAgent.isDesktop() || UserAgent.isTablet()) && this.state.phoneSlide === false) {
			this.setState('phoneSlide', true)
		} else {
			this.setState('phoneSlide', false)
		}
	}
	setPhoneTimeline() {
		this.timeline = new TimelineLite(CSSPlugin)
		.to(this.element, 1, { right: -50 })
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.element.removeClass('show')
				this.element.addClass('hide')
			} else {
				this.element.removeClass('hide')
				this.element.addClass('show')
				console.log(this.state.showPhone)
			}
			break
		case 'showPhone':
			if (value) {
				if (UserAgent.isMobile() && !UserAgent.isTablet()) {
					this.element.removeClass('slide-in-phone')
					this.element.addClass('slide-out-phone')
					console.log(this.state.showPhone)
				} else {
					this.element.removeClass('slide-in-phone-desktop')
					this.element.addClass('slide-out-phone-desktop')
					console.log('Desktop is working')
				}
			} else {
				if (UserAgent.isMobile() && !UserAgent.isTablet()) {
					this.element.addClass('slide-in-phone')
					this.element.removeClass('slide-out-phone')
					console.log(this.state.showPhone)
				} else {
					this.element.removeClass('slide-out-phone-desktop')
					this.element.addClass('slide-in-phone-desktop')
					console.log('Desktop is working -slide back in')
				}
			}
			break
		case 'phoneSlide':
			if (value) {
				this.setPhoneTimeline()
				console.log(this.state.phoneSlide)
			} else {
				this.timeline.reverse()
				console.log(this.state.phoneSlide)
			}
			break
		default:
			break
		}
	}
}
