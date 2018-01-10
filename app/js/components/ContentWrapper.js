import $ from '../vendor/zepto'
import Component from '../base/Component'
import { WindowSize } from '../services'

export default class ContentWrapper extends Component {
	constructor(parent) {
		super('.content-wrapper', parent)
		this.largeScreen = WindowSize.height >= 900

		WindowSize.on('resize', this.resize.bind(this))
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'entered':
			if (value) {
				this.element.addClass('entered')
			} else {
				this.element.removeClass('entered')
			}
			break
		case 'visited':
			if (value) {
				this.element.addClass('visited')
			} else {
				this.element.removeClass('visited')
			}
			break
		case 'reading':
			if (value) {
				this.element.removeClass('listen')
				this.element.addClass('read')
			} else {
				this.element.addClass('listen')
				this.element.removeClass('read')
			}
			break
		default:
			break
		}
	}

	resize() {
		const windowIsLarge = WindowSize.height >= 900
		// extend element to 100% height only when the window is scrollable
		if (windowIsLarge && !this.largeScreen) {
			this.largeScreen = true
			this.elements.body.css('height', '100%')
		} else if (!windowIsLarge && this.largeScreen) {
			this.largeScreen = false
			this.elements.body.css('height', 'auto')
		}
	}
}
