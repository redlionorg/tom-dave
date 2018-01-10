import ZingTouch from '../services/ZingTouch'
import Component from '../base/Component'
import Album from './Album'
import Enum from '../Enum'
import UserAgent from '../services/UserAgent'

export default class AlbumGallery extends Component {
	constructor(parent) {
		super('.album-gallery', parent)

		this.albums = {}
		this.albums[Enum.ALBUMS.ABOUT] = new Album('.album:nth-child(1)', this, Enum.ALBUMS.ABOUT)
		this.albums[Enum.ALBUMS.WORK] = new Album('.album:nth-child(2)', this, Enum.ALBUMS.WORK)
		this.albums[Enum.ALBUMS.CONTACT] = new Album('.album:nth-child(3)', this, Enum.ALBUMS.CONTACT)
		this.index = 0
		this.interactable = true

		if (UserAgent.isMobile()) {
			this.cacheDOMElement('inner', '.album-gallery-inner')
			this.cacheDOMElement('controls', '.album-gallery-controls')
			this.cacheDOMElement('dot1', '.album-gallery-controls .dot:first-child')
			this.cacheDOMElement('dot2', '.album-gallery-controls .dot:nth-child(2)')
			this.cacheDOMElement('dot3', '.album-gallery-controls .dot:last-child')

			const zt = new ZingTouch()
			const gesture = new zt.Swipe({ numInputs: 1 })
			zt.body.bind(this.element[0], 'swipe', (event) => {
				const { currentDirection, velocity } = event.detail.data[0]
				this.onSwipe(currentDirection, velocity)
			})
			this.ZingTouch = zt
		}
	}

	onSwipe(angle) {
		if (!this.interactable) {
			return
		}

		if (this.ZingTouch.Direction.IsLeft(angle)) {
			this.navigateRight()
		}

		if (this.ZingTouch.Direction.IsRight(angle)) {
			this.navigateLeft()
		}
	}

	setGalleryIndex(index) {
		if (index < 0 || index > 2) {
			return
		}

		this.index = index
		const strVal = index + 1

		for (let index1 = 1; index1 <= 3; index1 += 1) {
			if (strVal === index1) {
				this.elements.inner.addClass(`a${index1}`)
				this.elements[`dot${index1}`].addClass('selected')
			} else {
				this.elements.inner.removeClass(`a${index1}`)
				this.elements[`dot${index1}`].removeClass('selected')
			}
		}
	}

	navigateLeft() {
		this.setGalleryIndex(this.index - 1)
	}

	navigateRight() {
		this.setGalleryIndex(this.index + 1)
	}

	disableSwipe() {
		if (UserAgent.isDesktop()) {
			return
		}
		this.interactable = false
		this.elements.controls.css('opacity', 0.5)
	}

	enableSwipe() {
		if (UserAgent.isDesktop()) {
			return
		}
		this.interactable = true
		this.elements.controls.css('opacity', 1)
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.element.addClass('read')
				this.element.removeClass('listen')

				if (UserAgent.isMobile()) {
					this.setState('currentRecord', this.index)
				}
			} else {
				this.element.removeClass('read')
				this.element.addClass('listen')
			}
			break
		case 'currentRecord':
			if (typeof value === 'undefined') {
				this.albums[Enum.ALBUMS.ABOUT].deselect()
				this.albums[Enum.ALBUMS.WORK].deselect()
				this.albums[Enum.ALBUMS.CONTACT].deselect()
			}
			break
		case 'animateMobileCuedAlbumGallery':
			if (value) {
				this.setGalleryIndex(this.state.cuedRecord)

				setTimeout(() => {
					this.setState('animateMobileCuedAlbumGallery', false)
				}, 300)
			}
			break
		default:
			break
		}
	}

	select(index) {
		this.albums[index].select()
	}
}
