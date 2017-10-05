import Component from '../base/Component'

export default class ReadToggle extends Component {
	constructor(parent) {
		super('.read-toggle', parent)
		this.cacheDOMElement('text', 'p')
		this.cacheDOMElement('button', 'button')

		this.elements.button.on('click', this.onButtonClick.bind(this))
	}

	onButtonClick() {
		this.setGlobal('entered', true)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.$.removeClass('read')
				this.$.addClass('listen')
			} else {
				this.$.addClass('read')
				this.$.removeClass('listen')
			}
			break
		case 'entered':
			if (value) {
				this.$.removeClass('hide')
				this.$.addClass('show')
			} else {
				this.$.addClass('hide')
				this.$.removeClass('show')
			}
			break
		default:
			break
		}
	}
}
