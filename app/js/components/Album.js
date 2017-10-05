import Component from '../base/Component'

export default class Album extends Component {
	constructor(selector, parent, index) {
		super(selector, parent)
		this.deselect()
		this.setLocal('index', index)

		this.$.on('click', () => {
			if (!this.local.selected) {
				this.setGlobal('currentRecord', this.local.index)
				this.setGlobal('animating', true)
				this.select()
			}
		})
	}

	select() {
		this.setLocal('selected', true)
	}

	deselect() {
		this.setLocal('selected', false)
	}

	localDidUpdate(param, value) {
		switch (param) {
		case 'selected':
			if (value) {
				this.$.addClass('selected')
			} else {
				this.$.removeClass('selected')
			}
			break
		default:
			break
		}
	}
}
