import Component from '../base/Component'
import { UserAgent } from '../services'


const CSSPlugin = require('../../../node_modules/gsap/CSSPlugin.js')
const TimelineLite = require('../../../node_modules/gsap/TimelineLite.js')

export default class EmailToggle extends Component {
	constructor(parent) {
		super('.emailToggle', parent)
		this.element.on('click', this.onEmailClick.bind(this))
		console.log('emailToggle is working') // this
	}
	onEmailClick() {
		if ((UserAgent.isDesktop() || UserAgent.isTablet()) && this.state.emailSlide === false) {
			this.setState('emailSlide', true)
		} else {
			this.setState('emailSlide', false)
		}
	}

	setEmailTimeline() {
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
				console.log(this.state.showEmail)
			}
			break
		case 'showEmail':
			if (value) {
				if (UserAgent.isMobile() && !UserAgent.isTablet()) {
					this.element.removeClass('slide-in')
					this.element.addClass('slide-out')
					console.log(this.state.showEmail)
				} else {
					this.element.removeClass('slide-in-desktop')
					this.element.addClass('slide-out-desktop')
					console.log('Desktop is working')
				}
			} else {
				if (UserAgent.isMobile() && !UserAgent.isTablet()) {
					this.element.addClass('slide-in')
					this.element.removeClass('slide-out')
					console.log(this.state.showEmail)
				} else {
					this.element.removeClass('slide-out-desktop')
					this.element.addClass('slide-in-desktop')
					console.log('Desktop is working -slide back in')
				}
			}

			break
		case 'emailSlide':
			if (value) {
				this.setEmailTimeline()
				console.log(this.state.emailSlide)
			} else {
				this.timeline.reverse()
				console.log(this.state.emailSlide)
			}
			break
		default:
			break
		}
	}
}
