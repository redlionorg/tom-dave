import Observer from '../base/Observer'

class YoutubeIframeAPIClass extends Observer {
	constructor() {
		super()
		this.ready = false
		window.onYouTubeIframeAPIReady = this.onAPIReady.bind(this)
	}

	onAPIReady() {
		this.ready = true
		this.emit('ready')
	}
}

const YoutubeIframeAPI = new YoutubeIframeAPIClass()
export default YoutubeIframeAPI
