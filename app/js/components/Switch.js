import Component from '../base/Component'
import UserAgent from '../services/UserAgent'
import ZingTouch from '../services/ZingTouch'

export default class Switch extends Component { // TV / Radio switch
	constructor(parent) {
		super('.switch', parent)

		if (UserAgent.isDesktop()) {
			this.element.on('mousedown', this.onMouseDown.bind(this))
			this.element.on('mouseup', this.onMouseUp.bind(this))
		} else {
			const zt = new ZingTouch()
			const gesture = new zt.Swipe({ numInputs: 1 })
			zt.body.bind(this.element[0], 'swipe', (event) => {
				const { currentDirection } = event.detail.data[0]
				this.onSwipe(currentDirection)
			})
			this.ZingTouch = zt
		}

		this.isMouseDown = false
		this.origin = { x: 0, y: 0 }
	}

	onMouseDown(event) {
		this.isMouseDown = true
		this.origin = {
			x: event.clientX,
			y: event.clientY
		}
	}

	onMouseUp(event) {
		if (this.isMouseDown) {
			this.isMouseDown = false

			const endpoint = {
				x: event.clientX,
				y: event.clientY
			}
			const a = this.origin.x - endpoint.x
			const b = this.origin.y - endpoint.y
			const swipeDistance = Math.sqrt((a * a) + (b * b))

			if (swipeDistance > 30) {
				if (endpoint.x < this.origin.x) {
					this.swipeLeft()
				} else {
					this.swipeRight()
				}
			}
		}
	}

	onSwipe(angle) {
		if (this.state.animating) {
			return
		}

		if (this.ZingTouch.Direction.IsLeft(angle)) {
			this.swipeLeft()
		}

		if (this.ZingTouch.Direction.IsRight(angle)) {
			this.swipeRight()
		}
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'showTVLightbox':
		case 'showRadioLightbox':
			if (typeof value !== 'undefined' && !value) {
				this.element.removeClass('left').removeClass('right')
			}
			break
		default:
			break
		}
	}

	swipeLeft() {
		setTimeout(() => {
			this.setState('showTVLightbox', true)
		}, 300)
		this.element.addClass('left')
	}

	swipeRight() {
		setTimeout(() => {
			this.setState('showRadioLightbox', true)
		}, 300)
		this.element.addClass('right')
	}
}
