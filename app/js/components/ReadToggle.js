import Component from '../base/Component'

export default class ReadToggle extends Component {
	constructor(parent) {
		super('.read-toggle', parent)
		this.$.on('click', this.onButtonClick.bind(this))
	}

	onButtonClick() {
		if (this.global.reading) {
			this.setGlobal('reading', false)
		} else if (!this.global.reading && this.global.playing) {
			this.setGlobal('reading', true)
		}
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
