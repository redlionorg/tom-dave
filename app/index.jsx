import Header from './js/components/Header'
import Loading from './js/components/Loading'
import ReadToggle from './js/components/ReadToggle'
import ContentWrapper from './js/components/ContentWrapper'
import AlbumGallery from './js/components/AlbumGallery'
import RecordAnimation from './js/components/RecordAnimation'
import RecordPlayer from './js/components/RecordPlayer'
import ReadSection from './js/components/ReadSection'
import LoadingService from './js/services/Loading'
import Component from './js/base/Component'
import Global from './js/Global'
import AudioManager from './js/services/AudioManager'
import Enum from './js/Enum'

require('./index.scss')

class App extends Component {
	constructor() {
		super('#app')
		LoadingService.on('loaded', this.onLoad.bind(this))

		AudioManager.add(Enum.ALBUMS.ABOUT, 'audio/about.mp3')
		AudioManager.add(Enum.ALBUMS.CONTACT, 'audio/contact.mp3')
		AudioManager.add(Enum.ALBUMS.WORK, 'audio/work.mp3')
		AudioManager.on('end', this.onAudioEnd.bind(this))

		const header = new Header(app),
			loading = new Loading(app),
			readToggle = new ReadToggle(app),
			contentWrapper = new ContentWrapper(app),
			albumGallery = new AlbumGallery(contentWrapper),
			recordAnimation = new RecordAnimation(contentWrapper),
			recordPlayer = new RecordPlayer(contentWrapper),
			readSection = new ReadSection(app)

		Global.init({
			loaded: false,
			entered: false,
			reading: false,
			playing: false,
			animating: false,
			recordOnPlayer: false,
			needleActivated: false,
			recordRotation: undefined,
			currentAlbum: undefined,
			cuedAlbum: undefined
		})
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'animating':
			if (!value && typeof this.global.cuedRecord !== 'undefined' && !this.global.playing) {
				this.setGlobal('currentRecord', this.global.cuedRecord)
				this.setGlobal('animating', true)
				this.setGlobal('cuedRecord', undefined)
			}
			break
		}
	}

	onAudioEnd(audio) {
		this.setGlobal('playing', false)
	}

	onLoad() {
		this.setGlobal('loaded', true)
		this.$.removeClass('no-transition')
	}
}

const app = new App()