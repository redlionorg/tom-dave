import Component from '../base/Component'
import YoutubeVideo from '../YoutubeVideo'
import WindowSize from '../services/WindowSize'

const $ = window.$

export default class Slider extends Component { // lightbox
	constructor(selector, parent) {
		super(selector, parent)
		this.videos = {}
		this.previews = []
		this.labels = []
		this.videoIds = []
		this.dots = []
		this.elements.slides = []
		this.videoReadyCount = 0
		this.currentVideo = undefined
		this.slideWidth = undefined
		this.autoplay = false
		this.currentSlide = 0
		this.lastSlide = undefined
		this.init = false
		this.cacheDOMElement('container', '.slides-container')
		this.cacheDOMElement('inner', '.slides')
		this.initialize()
		this.load(0)

		WindowSize.on('resize', this.resize.bind(this))
	}

	onVideoReady() {
		if (typeof this.lastSlide !== 'undefined') {
			this.unload(this.lastSlide)
		}
		this.hidePreview()
		if (this.init) {
			this.currentVideo.play()
		}
		this.init = true
		this.autoplay = false
	}

	setSlide(index) {
		let newIndex = index

		if (newIndex >= this.slideCount) {
			newIndex = 0
		} else if (newIndex < 0) {
			newIndex = this.slideCount - 1
		}

		this.lastSlide = this.currentSlide
		this.setSlidesPosition(newIndex)
		this.showPreview()
		this.autoplay = true
		this.currentSlide = newIndex
		this.load()
	}

	setSlidesPosition(index = this.currentSlide) {
		if (typeof this.slideWidth === 'undefined') {
			return
		}
		// this.elements.inner.animate({ translateX: index * -this.slideWidth }, 1000)
		this.elements.inner.css({ left: index * -this.slideWidth })
	}

	load(index = this.currentSlide) {
		const video = this.cacheVideo(index)

		const dots = $(this.dots)
		dots.removeClass('selected')
		dots.eq(index).addClass('selected')
		this.currentVideo = video
	}

	cacheVideo(index) {
		const id = this.videoIds[index]

		if (!(id in this.videos)) {
			const element = $(this.elements.slides[index])
			element.prepend('<div class="video"><div></div></div>')
			const video = new YoutubeVideo(element.find('.video div')[0], id)
			this.videos[id] = video
			video.on('ready', this.onVideoReady.bind(this))
		}

		return this.videos[id]
	}

	unload(index = this.currentSlide) {
		const id = this.videoIds[index]
		if (id in this.videos) {
			if (this.currentVideo === this.videos[id]) {
				this.currentVideo = undefined
			}

			const element = $(this.elements.slides[index])
			element.find('.video').remove()
			const video = this.videos[id]
			video.destroy()
			delete this.videos[id]
		}
	}

	resize(width, height) {
		const scaledWidth = width < 750 ? width * 0.8 : width * 0.6
		const scaledHeight = (scaledWidth / (16 / 9)) + 30

		$(this.elements.container).css({
			width: scaledWidth,
			height: scaledHeight
		})
		$(this.elements.slides).css({
			width: scaledWidth,
			height: scaledHeight
		})
		$(this.elements.controls).css({
			width: scaledWidth,
			height: scaledHeight
		})

		this.slideWidth = scaledWidth
		this.setSlidesPosition()
	}

	initialize() {
		this.element.append('<div class="background"></div><div class="slides-controls"><div class="arrow arrow-left"><img class="normal" src="images/lightbox-arrow.png"><img class="hover" src="images/lightbox-arrow-hover.png"></div><div class="arrow arrow-right"><img class="normal" src="images/lightbox-arrow.png"><img class="hover" src="images/lightbox-arrow-hover.png"></div><div class="exit"><img class="normal" src="images/lightbox-exit.png"><img class="hover" src="images/lightbox-exit-hover.png"></div></div>')
		this.elements.container.append('<div class="dots"></div>')
		this.cacheDOMElement('controls', '.slides-controls')
		this.cacheDOMElement('dots', '.dots')
		this.cacheDOMElement('background', '.background')

		const slides = this.element.find('.slide')
		this.slideCount = slides.length
		let dotElements = ''

		slides.forEach((dom) => {
			const slide = $(dom)
			const label = slide.attr('data-label')
			const videoId = slide.attr('data-id')
			dotElements += '<div class="dot"><div class="filled"></div><div class="unfilled"></div></div>'

			this.labels.push(label || '')
			this.videoIds.push(videoId)
			slide.append(`<div class="label">${label}</div>`)
			// slide.append(`<div class="preview"><img src="https://img.youtube.com/vi/${videoId}/default.jpg"></div>`)
			// this.previews.push(slide.find('.preview'))
			this.elements.slides.push(dom)
		})

		this.elements.dots.append(dotElements)

		this.element.find('.arrow-left').on('click', this.previous.bind(this))
		this.element.find('.arrow-right').on('click', this.next.bind(this))
		this.element.find('.exit').on('click', this.hide.bind(this))
		this.elements.background.on('click', this.hide.bind(this))

		const dots = this.element.find('.dot')
		dots.forEach((dom, index) => {
			const dot = $(dom)
			this.dots.push(dom)
			dot.on('click', this.setSlide.bind(this, index))
		})
	}

	next() {
		this.setSlide(this.currentSlide + 1)
	}

	previous() {
		this.setSlide(this.currentSlide - 1)
	}

	hidePreview(index = this.currentSlide) {
		// this.previews[index].css('opacity', 0)
	}

	showPreview(index = this.currentSlide) {
		// this.previews[index].css('opacity', 1)
	}

	show() {
		this.element.css('display', 'block')
		this.element.animate({
			opacity: 1
		}, 300)
		this.currentVideo.play()
	}

	hide() {
		this.element.animate({ opacity: 0 }, 300, () => {
			this.element.css('display', 'none')
		})
		this.currentVideo.stop()
	}

	normalizeIndex(index) {
		if (index > this.videoIds.length) {
			return 0
		} else if (index < 0) {
			return this.videoIds.length
		}

		return index
	}

	isValidIndex(index) {
		return index >= 0 && index < this.videoIds.length
	}
}
