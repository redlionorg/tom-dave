import Component from '../base/Component'
import AudioManager from '../services/AudioManager'
import { UserAgent } from '../services'

export default class ReadToggle extends Component {
	constructor(parent) {
		super('.read-toggle', parent)
		this.$.on('click', this.onButtonClick.bind(this))
	}

	onButtonClick() {
		if (this.state.animating) {
			return
		}
		if (this.state.reading) {
			this.setState('currentRecord', undefined)
			this.setState('reading', false)
		} else {
			this.setState('reading', true)
			this.setState('playing', false)
		}
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.$.removeClass('listen')
				this.$.addClass('read')
			} else {
				this.$.addClass('listen')
				this.$.removeClass('read')
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
