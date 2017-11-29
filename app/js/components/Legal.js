import Component from '../base/Component'

export default class Legal extends Component {
	constructor(parent) {
		super('.legal', parent)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			if (typeof value !== 'undefined') {
				if (value === 0 && this.global.reading === false) {
					this.$.removeClass('show')
				} else {
					this.$.addClass('show')
				}
			} else {
				this.$.removeClass('show')
			}
			break
		default:
			break
		}
	}
}
