import Component from '../base/Component'

export default class Header extends Component {
	constructor(parent) {
		super('.header', parent)
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'loaded':
			if (value) {
				this.$.addClass('loaded')
			} else {
				this.$.removeClass('loaded')
			}
			break
		default:
			break
		}
	}
}
