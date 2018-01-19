import Component from '../base/Component'
import { UserAgent } from '../services'

export default class SoundIndicator extends Component {
	constructor(parent) {
		super('.sound-indicator', parent)
		this.timeout = undefined
	}

	resetTimeout() {
		if (typeof this.timeout !== 'undefined') {
			clearTimeout(this.timeout)
			this.timeout = undefined
		}
	}

	show() {
		this.element.addClass('show')
		this.timeout = setTimeout(this.hide.bind(this), 3000)
	}

	hide() {
		this.element.removeClass('show')
	}

	stateDidUpdate(param, value) {
		if (UserAgent.isDesktop()) {
			return
		}

		switch (param) {
		case 'currentRecord':
			if (this.state.reading === false && typeof value !== 'undefined') {
				this.resetTimeout()
				this.show()
			}
			break
		case 'reading':
			if (value) {
				this.resetTimeout()
				this.hide()
			}
			break
		default:
			break
		}
	}
}
