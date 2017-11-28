import Slider from './Slider'

export default class TVSlider extends Slider {
	globalDidUpdate(param, value) {
		switch (param) {
		case 'showTVLightbox':
			if (value) {
				this.show()
			} else {
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
		this.setGlobal('showTVLightbox', false)
	}
}
