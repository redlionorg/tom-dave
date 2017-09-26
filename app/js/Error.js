import Enum from './Enum'

export default class ErrorExtended extends Error {
	constructor(key) {
		let error
		if (typeof key === 'number' && key in Enum.error.CODES) {
			error = Enum.error[Enum.error.CODES[key]]
		} else if (typeof key === 'string' && key in Enum.error) {
			error = Enum.error[key]
		} else {
			if (typeof key === 'object' && 'code' in key && 'message' in key) {
				error = key
			} else {
				error = Enum.error.GENERIC
			}
		}
		super(error.message)
		this.code = error.code
		this.name = key
	}
}