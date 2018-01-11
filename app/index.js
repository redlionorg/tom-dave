import * as Components from './js/components'
import { UserAgent, AudioManager, Loader, YoutubeIframeAPI, GoogleMapAPI, Store } from './js/services'
import Component from './js/base/Component'
import State from './js/State'
import Enum from './js/Enum'

const loader = new Loader()

class App extends Component {
	constructor() {
		super('#app')
		loader.on('loaded', this.onLoad.bind(this))

		if (UserAgent.isDesktop()) {
			this.element.addClass('desktop')
		} else {
			this.element.addClass('mobile')
		}

		AudioManager.add(Enum.ALBUMS.ABOUT, 'audio/about.mp3')
		AudioManager.add(Enum.ALBUMS.CONTACT, 'audio/contact.mp3')
		AudioManager.add(Enum.ALBUMS.WORK, 'audio/work.mp3')
		AudioManager.add('record_noises', 'audio/player_start.mp3')
		AudioManager.add('record_noises_end', 'audio/player_end.mp3')
		AudioManager.on('end', this.onAudioEnd.bind(this))

		State.init({
			visited: false,
			loaded: false,
			entered: false,
			reading: false,
			playing: false,
			paused: false,
			animating: false,
			showRadioLightbox: false,
			radioLightboxIndex: 0,
			showTVLightbox: false,
			recordAngle: 0,
			tvLightboxIndex: 0,
			recordOnPlayer: false,
			needleActivated: false,
			recordRotation: undefined,
			currentRecord: undefined,
			cuedRecord: undefined,
			mobileGalleryIndex: 0
		})

		if (UserAgent.isMobile()) {
			this.element.find('.desktop').addClass('hide-block')
			this.element.find('.mobile').addClass('show')
		}
	}

	onAudioEnd(sound) {
		if (typeof sound.id === 'number') {
			this.setState('playing', false)
		}
	}

	onLoad() {
		this.setState('loaded', true)
		this.element.removeClass('no-transition')
	}

	stateDidUpdate(param, value) {
		switch (param) {
		case 'animating':
			if (!value && typeof this.state.cuedRecord !== 'undefined' && !this.state.playing && !this.state.reading) {
				setTimeout(() => {
					this.setState('currentRecord', this.state.cuedRecord)
					this.setState('cuedRecord', undefined)
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
const readSection = new Components.ReadSection(app)
const listenSection = new Components.ListenSection(app)
new Components.WorkSection(listenSection)
new Components.Switch(listenSection)

new Components.TVSlider('.slider.tv-slider', app)
new Components.RadioSlider('.slider.radio-slider', app)

const userHasVisited = Store.get('visited')
if (userHasVisited) {
	loader.setLoaded()
	State.set('visited', true)
	State.set('entered', true)
} else {
	Store.set('visited', true)
}
