import Component from '../base/Component'
import AudioManager from '../services/AudioManager'
import { UserAgent } from '../services'

export default class ReadToggle extends Component {
	constructor(parent) {
		super('.read-toggle', parent)
		this.element.on('click', this.onButtonClick.bind(this))
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
				this.setState('animating', true)
				setTimeout(() => {
					// disable toggle button to allow for the listen animation to reset
					this.setState('animating', false)
				}, 2000)

				this.element.removeClass('listen')
				this.element.addClass('read')
			} else {
				this.element.addClass('listen')
				this.element.removeClass('read')
			}
			break
		case 'entered':
			if (value) {
				this.element.removeClass('hide')
				this.element.addClass('show')
			} else {
				this.element.addClass('hide')
				this.element.removeClass('show')
			}
			break
		default:
			break
		}
	}
}
