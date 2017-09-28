const BaseReducer = (state = {
	loaded: false,
	hasEntered: false,
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
	case 'SHOULD_ENTER':
		return {
			...state,
			hasEntered: true
		}
	default:
		return state
	}
}

export default BaseReducer
