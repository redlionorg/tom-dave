import Component from '../base/Component'
import Enum from '../Enum'
import { UserAgent } from '../services'

export default class PhoneToggle extends Component {
	constructor(parent) {
		super('.phoneToggle', parent)
		this.cacheDOMElement('phone', '.phone')


		console.log('Phone toggle is working') // this
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
				this.element.removeClass('slide-in-phone')
				this.element.addClass('slide-out-phone')
				console.log(this.state.showPhone)
			} else {
				this.element.addClass('slide-in-phone')
				this.element.removeClass('slide-out-phone')
				console.log(this.state.showPhone)
			}

			break
		default:
			break
		}
	}
}
