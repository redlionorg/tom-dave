export default class Observer {
	constructor() {
		this.subjects = {}
	}

	on(e, fn, args) {
		if (typeof e === 'undefined' || typeof fn !== 'function') {
			return
		}
		if (!(e in this.subjects)) {
			this.subjects[e] = []
		}
		this.subjects[e].push({ event: e, fn, args })
	}

	emit(e, args) {
		if (e in this.subjects) {
			const values = Object.values(this.subjects[e])
			for (let index = 0; index < values.length; index += 1) {
				const subject = values[index]
				subject.fn.call(this, subject.args, args)
			}
		}
	}

	off(e, fn) {
		if (!(e in this.subjects)) {
			return
		}
		if (typeof fn === 'function') {
			const values = Object.values(this.subjects[e])
			for (let index = 0; index < values.length; index += 1) {
				const subject = values[index]
				if (subject.fn === fn) {
					this.subjects[e].splice(0, index)
				}
			}
		} else {
			delete this.subjects[e]
		}
	}
}
