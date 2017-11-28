import Component from '../base/Component'
import Enum from '../Enum'
import { WindowSize } from '../services'

export default class ReadSection extends Component {
	constructor(parent) {
		super('.read-section', parent)
		this.cacheDOMElement('about', '.about')
		this.cacheDOMElement('work', '.work')
		this.cacheDOMElement('contact', '.contact')

		this.cacheDOMElement('mapForeground', '.map .foreground')
		this.cacheDOMElement('mapBackground', '.map .background')
		this.cacheDOMElement('mapMiddleground', '.map .middleground')

		WindowSize.on('resize', this.resize.bind(this))

		this.elements.mapMiddleground.on('mouseover', this.onMapHover.bind(this))
	}

	onMapHover() {
		const foreground = $(this.elements.mapMiddleground)
		foreground.animate({
			opacity: 0
		}, () => {
			foreground.css('display', 'none')
		})
	}

	resize() {
		$(this.elements.mapBackground).css('height', this.elements.mapMiddleground.height() + 10)
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
				this.resize()
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
