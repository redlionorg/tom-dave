import Component from '../base/Component'
import { UserAgent } from '../services'

const CSSPlugin = require('../../../node_modules/gsap/CSSPlugin.js')
const TimelineLite = require('../../../node_modules/gsap/TimelineLite.js')

export default class EmailToggle extends Component {
	constructor(parent) {
		super('.emailToggle', parent)

		console.log('emailToggle is working') // this
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
			}
			break
		case 'showEmail':
			if (value) {
				this.element.removeClass('slide-in')
				this.element.addClass('slide-out')
			} else {
				this.element.addClass('slide-in')
				this.element.removeClass('slide-out')
			}
			break
		default:
			break
		}
	}
}
