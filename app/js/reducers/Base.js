const BaseReducer = (state = {
	loaded: false,
	animating: false,
	reading: false,
	currentAlbum: undefined,
	playing: false
}, action) => {
	switch (action.type) {
	case 'LOADING_COMPLETE':
		return {
			...state,
			loaded: true
		}
	default:
		return state
	}
}

export default BaseReducer
