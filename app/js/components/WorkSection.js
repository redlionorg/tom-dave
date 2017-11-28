import Component from '../base/Component'

export default class WorkSection extends Component {
	constructor(parent) {
		super('.work', parent)
		this.cacheDOMElement('tvTitle', '.tv-title')
		this.cacheDOMElement('patch', '.patch')
		this.cacheDOMElement('can', '.can')
		this.cacheDOMElement('espresso', '.espresso')
		this.cacheDOMElement('lintroller', '.sunglasses')
		this.cacheDOMElement('stamp', '.stamp')
		this.cacheDOMElement('caliper', '.caliper')
		this.cacheDOMElement('bag', '.bag')
		this.cacheDOMElement('headphones', '.headphones')
		this.cacheDOMElement('coaster', '.coaster')
		this.cacheDOMElement('nametag', '.nametag')
		this.cacheDOMElement('pencils', '.pencils')
		this.cacheDOMElement('camera', '.camera')
		this.cacheDOMElement('radioTitle', '.radio-title')
		this.cacheDOMElement('letterPress', '.letter-press')
		this.cacheDOMElement('saleTag', '.sale-tag')

		this.lightboxIndexMap = {
			patch: 0,
			can: 1,
			espresso: 2,
			lintroller: 3,
			stamp: 4,
			caliper: 5,
			bag: 6,
			headphones: 7,
			coaster: 0,
			nametag: 1,
			pencils: 2,
			letterPress: 3,
			saleTag: 4
		}

		this.categoryMap = {
			patch: 0,
			can: 0,
			espresso: 0,
			lintroller: 0,
			stamp: 0,
			caliper: 0,
			bag: 0,
			headphones: 0,
			coaster: 1,
			nametag: 1,
			pencils: 1,
			letterPress: 1,
			saleTag: 1
		}

		this.categories = {
			TV: 0,
			RADIO: 1
		}

		const keys = Object.keys(this.elements)
		for (let index = 0; index < keys.length; index += 1) {
			const element = this.elements[keys[index]]
			element.click(this.onWorkElementClick.bind(this, keys[index], element))
		}
	}

	onWorkElementClick(item) {
		if (this.global.animating) {
			return
		}

		const index = this.lightboxIndexMap[item]
		const category = this.categoryMap[item]

		if (category === this.categories.TV) {
			this.setGlobal('tvLightboxIndex', index)
			this.setGlobal('showTVLightbox', true)
		} else {
			this.setGlobal('radioLightboxIndex', index)
			this.setGlobal('showRadioLightbox', true)
		}
	}
}
