import Component from '../base/Component'

export default class EmailToggle extends Component {
	constructor(parent) {
		super('.emailToggle', parent)
		console.log('emailToggle is working') // this
	}


	stateDidUpdate(param, value) {
		switch (param) {
		case 'reading':
			if (value) {
				this.element.removeClass('show')
				this.element.addClass('hide')
			} else {
				this.element.removeClass('hide')
				this.element.addClass('show')
			}
			break
		case 'showEmail':
			if (value) {
				this.element.removeClass('slide-in')
				this.element.addClass('slide-out')
				console.log(this.state.showEmail)
			} else {
				this.element.addClass('slide-in')
				this.element.removeClass('slide-out')
				console.log(this.state.showEmail)
			}

			break
		default:
			break
		}
	}
}
