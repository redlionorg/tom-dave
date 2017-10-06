import Component from '../base/Component'
import Enum from '../Enum'

export default class ReadSection extends Component {
	constructor(parent) {
		super('.read-section', parent)
		this.cacheDOMElement('about', '.about')
		this.cacheDOMElement('work', '.work')
		this.cacheDOMElement('contact', '.contact')
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.$.removeClass('hide-block')
			} else {
				this.$.addClass('hide-block')
			}
			break
		case 'currentRecord':
			this.elements.about.removeClass('show')
			this.elements.work.removeClass('show')
			this.elements.contact.removeClass('show')

			switch (value) {
			case Enum.ALBUMS.ABOUT:
				this.elements.about.addClass('show')
				break
			case Enum.ALBUMS.CONTACT:
				this.elements.contact.addClass('show')
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
