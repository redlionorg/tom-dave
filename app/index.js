import Body from './js/components/Body'
import Header from './js/components/Header'
import Loading from './js/components/Loading'
import ReadToggle from './js/components/ReadToggle'
import ContentWrapper from './js/components/ContentWrapper'
import AlbumGallery from './js/components/AlbumGallery'
import RecordAnimation from './js/components/RecordAnimation'
import RecordPlayer from './js/components/RecordPlayer'
import ReadSection from './js/components/ReadSection'
import LoadingService from './js/services/Loading'
import ListenSection from './js/components/ListenSection'
import WorkSection from './js/components/WorkSection'
import Component from './js/base/Component'
import Global from './js/Global'
import AudioManager from './js/services/AudioManager'
import Enum from './js/Enum'
import UserAgent from './js/services/UserAgent'

require('./index.scss')

if (UserAgent.isDesktop()) {
	require('./scss/desktop/index.scss')
} else {
	require('./scss/mobile/index.scss')
}

class App extends Component {
	constructor() {
		super('#app')
		const loading = new LoadingService()
		loading.on('loaded', this.onLoad.bind(this))

		AudioManager.add(Enum.ALBUMS.ABOUT, 'audio/about.mp3')
		AudioManager.add(Enum.ALBUMS.CONTACT, 'audio/contact.mp3')
		AudioManager.add(Enum.ALBUMS.WORK, 'audio/work.mp3')
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

	onAudioEnd() {
		this.setGlobal('playing', false)
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
new Body(app)
new Header(app)
new Loading(app)
new ReadToggle(app)
const contentWrapper = new ContentWrapper(app)
new AlbumGallery(contentWrapper)
new RecordAnimation(contentWrapper)
new RecordPlayer(contentWrapper)
new ReadSection(app)
const listenSection = new ListenSection(app)
new WorkSection(listenSection)
