import ZingTouch from '../services/ZingTouch'
import Component from '../base/Component'
import UserAgent from '../services/UserAgent'

export default class Album extends Component {
	constructor(selector, parent, index) {
		super(selector, parent)
		this.deselect()
		this.setProp('index', index)

		this.cacheDOMElement('albumRead', '.normal .read, .hover .read')
		this.cacheDOMElement('albumListen', '.normal .listen, .hover .listen')

		if (UserAgent.isMobile()) {
			const zt = new ZingTouch()
			zt.body.bind(this.$[0], new zt.Tap(), this.select.bind(this))
		} else {
			this.$.on('click', this.select.bind(this))
		}
	}

	select() {
		if (this.state.animating || this.prop.selected) {
			return
		}
		if (!this.state.playing) {
			this.setState('currentRecord', this.prop.index)
			if (!this.state.reading) {
				this.setState('animating', true)
			}
			this.setProp('selected', true)
		} else {
			this.setState('cuedRecord', this.prop.index)
			this.setState('playing', false)
		}
	}

	deselect() {
		this.setProp('selected', false)
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			if (value === this.prop.index) {
				this.select()
			} else {
				this.deselect()
			}
			break
		case 'reading':
			if (value) {
				this.elements.albumRead.css('opacity', 1)
				this.elements.albumListen.css('opacity', 0)
			} else {
				this.elements.albumRead.css('opacity', 0)
				this.elements.albumListen.css('opacity', 1)
			}
			break
		default:
			break
		}
	}

	propDidUpdate(param, value) {
		switch (param) {
		case 'selected':
			if (value) {
				this.$.addClass('selected')
			} else {
				this.$.removeClass('selected')
			}
			break
		default:
			break
		}
	}
}
