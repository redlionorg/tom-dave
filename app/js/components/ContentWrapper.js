import $ from '../vendor/zepto'
import Component from '../base/Component'

export default class ContentWrapper extends Component {
	constructor(parent) {
		super('.content-wrapper', parent)
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
		case 'loaded':
			if (value) {
				this.element.addClass('loaded')
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
}
