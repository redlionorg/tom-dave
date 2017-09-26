var store = require('store')

class Store {
	get(key) {
		return store.get(`tom-dave:${key}`)
	}

	set(key, obj, condition=true) {
		if (condition) {
			store.set(`tom-dave:${key}`, obj)
		}
	}

	clear() {
		return store.remove('tom-dave')
	}
}

export let instance = new Store()