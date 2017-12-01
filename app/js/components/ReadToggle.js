import Component from '../base/Component'
import AudioManager from '../services/AudioManager'

export default class ReadToggle extends Component {
	constructor(parent) {
		super('.read-toggle', parent)
		this.$.on('click', this.onButtonClick.bind(this))
	}

	onButtonClick() {
		if (this.global.animating) {
			return
		}
		if (this.global.reading) {
			this.setGlobal('currentRecord', undefined)
			this.setGlobal('reading', false)
		} else {
			this.setGlobal('reading', true)
			this.setGlobal('playing', false)
		}
	}

	globalDidUpdate(param, value) {
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
