import Observer from '../util/Observer'

class Loading extends Observer {
	constructor() {
		super()
		this.minimumWaitTime = 4000
		this.loaded = false
		this.waited = false

		window.addEventListener('DOMContentLoaded', this.onDOMContentLoad.bind(this))
		setTimeout(this.onWaited.bind(this), this.minimumWaitTime)
	}

	onDOMContentLoad() {
		this.loaded = true
		this.onLoaded()
	}

	onWaited() {
		this.waited = true
		this.onLoaded()
	}

	onLoaded() {
		if (this.loaded && this.waited) {
			this.emit('loaded')
		}
	}
}

const LoadingService = new Loading()
export default LoadingService
