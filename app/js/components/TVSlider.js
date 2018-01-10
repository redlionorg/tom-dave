import Slider from './Slider'

export default class TVSlider extends Slider {
	stateDidUpdate(param, value) {
		switch (param) {
		case 'showTVLightbox':
			if (value) {
				this.setState('animating', true)
				this.show()
			} else {
				this.setState('animating', true)
				this.hide()
			}
			break
		case 'tvLightboxIndex':
			if (typeof value === 'number') {
				this.setSlide(value)
			}
			break
		default:
			break
		}
	}

	hide() {
		super.hide()
		this.setState('showTVLightbox', false)
	}
}
