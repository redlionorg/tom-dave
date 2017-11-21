import ZingTouch from '../services/ZingTouch'
import Component from '../base/Component'
import UserAgent from '../services/UserAgent'

export default class Album extends Component {
	constructor(selector, parent, index) {
		super(selector, parent)
		this.deselect()
		this.setLocal('index', index)

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
		if ((this.global.animating && !this.global.animateMobileCuedAlbumGallery)
		|| this.local.selected) {
			return
		}
		if (!this.global.playing) {
			this.setGlobal('currentRecord', this.local.index)
			if (!this.global.reading) {
				this.setGlobal('animating', true)
			}
			this.setLocal('selected', true)
		} else {
			this.setGlobal('cuedRecord', this.local.index)
			this.setGlobal('playing', false)
		}
	}

	deselect() {
		this.setLocal('selected', false)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			if (value === this.local.index) {
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

	localDidUpdate(param, value) {
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
