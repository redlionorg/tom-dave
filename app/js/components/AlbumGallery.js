import Component from '../base/Component'
import Album from './Album'
import Enum from '../Enum'

export default class AlbumGallery extends Component {
	constructor(parent) {
		super('.album-gallery', parent)

		this.albums = {}
		this.albums[Enum.ALBUMS.ABOUT] = new Album('.album:nth-child(1)', this, Enum.ALBUMS.ABOUT)
		this.albums[Enum.ALBUMS.WORK] = new Album('.album:nth-child(2)', this, Enum.ALBUMS.WORK)
		this.albums[Enum.ALBUMS.CONTACT] = new Album('.album:nth-child(3)', this, Enum.ALBUMS.CONTACT)
	}

	globalDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.$.addClass('read')
				this.$.removeClass('listen')
			} else {
				this.$.removeClass('read')
				this.$.addClass('listen')
			}
			break
		default:
			break
		}
	}

	select(index) {
		this.albums[index].select()
	}
}
