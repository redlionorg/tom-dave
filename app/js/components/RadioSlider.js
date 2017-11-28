import Slider from './Slider'

export default class RadioSlider extends Slider {
	globalDidUpdate(param, value) {
		switch (param) {
		case 'showRadioLightbox':
			if (value) {
				this.show()
			} else {
				this.hide()
			}
			break
		case 'radioLightboxIndex':
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
		this.setGlobal('showRadioLightbox', false)
	}
}
