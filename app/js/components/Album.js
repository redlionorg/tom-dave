import Component from '../base/Component'

export default class Album extends Component {
	constructor(selector, parent, index) {
		super(selector, parent)
		this.deselect()
		this.setLocal('index', index)

		this.cacheDOMElement('albumRead', '.normal .read, .hover .read')
		this.cacheDOMElement('albumListen', '.normal .listen, .hover .listen')

		this.$.on('click', () => {
			if (this.global.animating) {
				return
			}
			if (!this.global.playing) {
				if (!this.local.selected) {
					this.setGlobal('currentRecord', this.local.index)
					this.setGlobal('animating', true)
				}
			} else {
				this.setGlobal('cuedRecord', index)
				this.setGlobal('playing', false)
			}
		})
	}

	select() {
		this.setLocal('selected', true)
	}

	deselect() {
		this.setLocal('selected', false)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'currentRecord':
			if (value === this.local.index) {
				this.select()
			}
			if (typeof value === 'undefined') {
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
