import Component from '../base/Component'

export default class Legal extends Component {
	constructor(parent) {
		super('.legal', parent)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			if (typeof value !== 'undefined') {
				if ((value === 0 || value === 2) && this.global.reading === false) {
					this.$.removeClass('fade-in')
				} else {
					this.$.addClass('fade-in')
				}
			} else {
				this.$.removeClass('fade-in')
			}
			break
		default:
			break
		}
	}
}
