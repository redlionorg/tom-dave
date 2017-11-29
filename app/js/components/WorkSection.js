import Component from '../base/Component'

export default class WorkSection extends Component {
	constructor(parent) {
		super('.work', parent)
		this.cacheDOMElement('tvTitle', '.tv-title')
		this.cacheDOMElement('radioTitle', '.radio-title')

		this.categories = {
			TV: 0,
			RADIO: 1
		}

		this.elements.tvTitle.on('click', this.onTVClicked.bind(this))
		this.elements.radioTitle.on('click', this.onRadioClicked.bind(this))
	}

	onTVClicked() {
		if (this.global.animating) {
			return
		}
		// this.setGlobal('tvLightboxIndex', 0)
		this.setGlobal('showTVLightbox', true)
	}

	onRadioClicked() {
		if (this.global.animating) {
			return
		}
		// this.setGlobal('radioLightboxIndex', 0)
		this.setGlobal('showRadioLightbox', true)
	}
}
