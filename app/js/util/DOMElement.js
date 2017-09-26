export default class DOMElement {
	constructor() {
		this.element = undefined
	}

	Update(element) {
		this.element = element
	}

	Focus() {
		if (!!this.element) {
			this.element.focus()
		}
	}
}