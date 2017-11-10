export default class UserAgent {
	static isMobile() {
		return !!navigator.userAgent.match(/mobi/i)
	}

	static isDesktop() {
		return !this.isMobile()
	}
}
