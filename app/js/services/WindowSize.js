const $ = require('zeptojs')

class _WindowSize {
	constructor() {
		window.addEventListener('DOMContentLoaded', this.onResize.bind(this))
		window.addEventListener('resize', this.onResize.bind(this))
		this.$ = $(window)
		this.width = 0
		this.height = 0
	}

	onResize() {
		this.width = this.$.width()
		this.height = this.$.height()
		console.log(this.width, this.height)
	}
}

const WindowSize = new _WindowSize()
export default WindowSize
