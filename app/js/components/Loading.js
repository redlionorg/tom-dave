import Component from '../base/Component'

export default class Loading extends Component {
	constructor(parent) {
		super('.loading', parent)
		this.cacheDOMElement('button', 'button')

		this.elements.button.on('click', this.onButtonClick.bind(this))
	}

	onButtonClick() {
		this.setState('entered', true)
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'visited':
			if (value) {
				this.element.addClass('visited')
			}
			break
		case 'loaded':
			if (value) {
				this.element.addClass('loaded')
				setTimeout(() => {
					this.elements.button.addClass('show')
					this.elements.button.removeClass('hide')
				}, 300)
			} else {
				this.elements.button.removeClass('show')
				this.elements.button.addClass('hide')
			}
			break
		default:
			break
		}
	}
}
