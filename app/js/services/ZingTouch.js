import * as ZingTouchLibrary from 'zingtouch'

let instance

export default class ZingTouch {
	constructor() {
		if (!instance) {
			instance = this

			delete ZingTouchLibrary.default
			Object.assign(this, ZingTouchLibrary)
			this.body = new ZingTouchLibrary.Region(document.body)
		}

		return instance
	}

	IsLeft(value) {
		return value > 90 && value < 270
	}

	IsDown(value) {
		return value > 180 && value < 360
	}

	IsUp(value) {
		return value > 0 && value < 180
	}

	IsRight(value) {
		return (value > 270 && value <= 360) || (value >= 0 && value < 90)
	}

	get Direction() {
		const { IsLeft, IsRight, IsUp, IsDown } = this
		return { IsLeft, IsRight, IsUp, IsDown }
	}

	set Direction(value) {
		// not implemented
	}
}
