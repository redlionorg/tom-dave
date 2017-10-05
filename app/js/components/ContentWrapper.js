import Component from '../base/Component'

export default class ContentWrapper extends Component {
	constructor(parent) {
		super('.content-wrapper', parent)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'entered':
			if (value) {
				this.$.addClass('entered')
			} else {
				this.$.removeClass('entered')
			}
			break
		default:
			break
		}
	}
}
