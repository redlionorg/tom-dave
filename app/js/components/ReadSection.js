import Component from '../base/Component'
import Enum from '../Enum'
import { WindowSize, UserAgent, GoogleMapsAPI } from '../services'

export default class ReadSection extends Component {
	constructor(parent) {
		super('.read-section', parent)
		this.cacheDOMElement('about', '.about')
		this.cacheDOMElement('work', '.work')
		this.cacheDOMElement('contact', '.contact')
		this.cacheDOMElement('map', '.map')
		this.cacheDOMElement('tvButton', 'button.tv')
		this.cacheDOMElement('radioButton', 'button.radio')

		this.elements.radioButton.click(this.onRadioButtonClick.bind(this))
		this.elements.tvButton.click(this.onTVButtonClick.bind(this))

		// GoogleMapsAPI.on('ready', this.onMapAPIReady.bind(this))
		this.map = GoogleMapsAPI.create(this.elements.map[0])
	}

	onTVButtonClick() {
		this.setState('showTVLightbox', true)
	}

	onRadioButtonClick() {
		this.setState('showRadioLightbox', true)
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.element.removeClass('hide-block')
			} else {
				this.element.addClass('hide-block')
			}
			break
		case 'currentRecord':
			if (typeof value === 'undefined') {
				return
			}
			this.elements.about.removeClass('show')
			this.elements.work.removeClass('show')
			this.elements.contact.removeClass('show')

			switch (value) {
			case Enum.ALBUMS.ABOUT:
				this.elements.about.addClass('show')
				break
			case Enum.ALBUMS.CONTACT:
				this.elements.contact.addClass('show')
				GoogleMapsAPI.google.maps.event.trigger(this.map, 'resize') // force redraw when visible so the map isn't blank
				break
			case Enum.ALBUMS.WORK:
				this.elements.work.addClass('show')
				break
			default:
				break
			}
			break
		default:
			break
		}
	}
}
