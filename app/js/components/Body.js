import Component from '../base/Component'

export default class Body extends Component {
	constructor(parent) {
		super('.body', parent)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'entered':
			if (value) {
				this.$.addClass('entered')
			}
			break
		default:
			break
		}
	}
}
