class UserAgentClass {
	constructor() {
		this.ua = navigator.userAgent
		this.mobile = !!this.ua.match(/mobi/i)
		this.tablet = !!this.ua.match(/tablet|ipad/i)
	}

	userAgent() {
		return this.ua
	}

	isMobile() {
		return this.mobile
	}
	isTablet() {
		return this.tablet
	}

	isDesktop() {
		return !this.mobile && !this.tablet
	}
}

const UserAgent = new UserAgentClass()
export default UserAgent
