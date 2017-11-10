import Util from '../Util'

const $ = require('zeptojs')

let instance

export default class WindowSize {
	constructor() {
		if (!instance) {
			window.addEventListener('DOMContentLoaded', this.onResize.bind(this))
			window.addEventListener('resize', Util.debounce(this.onResize.bind(this), 150))
			this.$ = $(window)
			this.width = 0
			this.height = 0
			instance = this
		}

		return instance
	}

	onResize() {
		this.width = this.$.width()
		this.height = this.$.height()
	}
}
