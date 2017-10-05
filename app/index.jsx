import Header from './js/components/Header'
import Loading from './js/components/Loading'
import ReadToggle from './js/components/ReadToggle'
import ContentWrapper from './js/components/ContentWrapper'
import AlbumGallery from './js/components/AlbumGallery'
import RecordAnimation from './js/components/RecordAnimation'
import RecordPlayer from './js/components/RecordPlayer'
import LoadingService from './js/services/Loading'
import Component from './js/base/Component'
import Global from './js/Global'

require('./index.scss')

class App extends Component {
	constructor() {
		super('#app')
		LoadingService.on('loaded', this.onLoad.bind(this))
	}

	onLoad() {
		this.setGlobal('loaded', true)
		this.$.removeClass('no-transition')
	}
}

const app = new App(),
	header = new Header(app),
	loading = new Loading(app),
	readToggle = new ReadToggle(app),
	contentWrapper = new ContentWrapper(app),
	albumGallery = new AlbumGallery(contentWrapper),
	recordAnimation = new RecordAnimation(contentWrapper),
	recordPlayer = new RecordPlayer(contentWrapper)

Global.init({
	loaded: false,
	entered: false,
	reading: false,
	playing: false,
	animating: false,
	recordOnPlayer: false,
	needleActivated: false,
	currentAlbum: undefined
})