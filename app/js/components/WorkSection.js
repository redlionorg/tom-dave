import Component from '../base/Component'
import Enum from '../Enum'

export default class WorkSection extends Component {
	constructor(parent) {
		super('.work', parent)
		this.cacheDOMElement('tvTitle', '.tv-title')
		this.cacheDOMElement('patch', '.patch')
		this.cacheDOMElement('can', '.can')
		this.cacheDOMElement('espresso', '.espresso')
		this.cacheDOMElement('sunglasses', '.sunglasses')
		this.cacheDOMElement('stamp', '.stamp')
		this.cacheDOMElement('caliper', '.caliper')
		this.cacheDOMElement('tube', '.tube')
		this.cacheDOMElement('coaster', '.coaster')
		this.cacheDOMElement('nametag', '.nametag')
		this.cacheDOMElement('pencils', '.pencils')
		this.cacheDOMElement('camera', '.camera')
		this.cacheDOMElement('radio-title', '.radio-title')
		this.cacheDOMElement('letter-press', '.letter-press')
		this.cacheDOMElement('sale-tag', '.sale-tag')

		const keys = Object.keys(this.elements)
		for (let index = 0; index < keys.length; index++) {
			const element = this.elements[keys[index]]
			element.click(this.onWorkElementClick.bind(this, keys[index], element))
		}
	}

	onWorkElementClick(item, $) {
		console.log(`${item} clicked!`)
	}
}
