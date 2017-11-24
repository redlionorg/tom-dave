import * as Components from './js/components'
import { UserAgent, AudioManager, Loader, YoutubeIframeAPI, GoogleMapAPI } from './js/services'
import Component from './js/base/Component'
import Global from './js/Global'
import Enum from './js/Enum'

require('./index.scss')
if (UserAgent.isDesktop()) {
	require('./scss/desktop/index.scss')
} else {
	require('./scss/mobile/index.scss')
}

class App extends Component {
	constructor() {
		super('#app')
		const loader = new Loader()
		loader.on('loaded', this.onLoad.bind(this))

		AudioManager.add(Enum.ALBUMS.ABOUT, 'audio/about.mp3')
		AudioManager.add(Enum.ALBUMS.CONTACT, 'audio/contact.mp3')
		AudioManager.add(Enum.ALBUMS.WORK, 'audio/work.mp3')
		AudioManager.add('record_noises', 'audio/player_start.mp3')
		AudioManager.on('end', this.onAudioEnd.bind(this))

		Global.init({
			loaded: false,
			entered: false,
			reading: false,
			playing: false,
			paused: false,
			animating: false,
			recordOnPlayer: false,
			needleActivated: false,
			recordRotation: undefined,
			currentAlbum: undefined,
			cuedAlbum: undefined,
			animateMobileCuedAlbumGallery: false
		})

		if (UserAgent.isMobile()) {
			this.$.find('.desktop').addClass('hide-block')
			this.$.find('.mobile').addClass('show')
		}
	}

	onAudioEnd(sound) {
		if (typeof sound.id === 'number') {
			this.setGlobal('playing', false)
		}
	}

	onLoad() {
		this.setGlobal('loaded', true)
		this.$.removeClass('no-transition')
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'animating':
			if (!value && typeof this.global.cuedRecord !== 'undefined' && !this.global.playing && !this.global.reading) {
				if (UserAgent.isMobile()) {
					this.setGlobal('animateMobileCuedAlbumGallery', true)
				}
				setTimeout(() => {
					this.setGlobal('currentRecord', this.global.cuedRecord)
					this.setGlobal('cuedRecord', undefined)
				}, 300)
			}
			break
		default:
			break
		}
	}
}

const app = new App()
new Components.Body(app)
new Components.Header(app)
new Components.Loading(app)
new Components.ReadToggle(app)
const contentWrapper = new Components.ContentWrapper(app)
new Components.AlbumGallery(contentWrapper)
new Components.RecordAnimation(contentWrapper)
new Components.RecordPlayer(contentWrapper)
new Components.ReadSection(app)
const listenSection = new Components.ListenSection(app)
new Components.WorkSection(listenSection)

new Components.Slider('.slider.tv-slider', app)
// new Slider('.slider.radio-slider')

