import Component from '../base/Component'

export default class Loading extends Component {
	constructor(parent) {
		super('.loading', parent)
		this.cacheDOMElement('button', 'button')

		this.elements.button.on('click', this.onButtonClick.bind(this))
	}

	onButtonClick() {
		this.setGlobal('entered', true)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'loaded':
			if (value) {
				this.elements.button.addClass('show')
				this.elements.button.removeClass('hide')
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
