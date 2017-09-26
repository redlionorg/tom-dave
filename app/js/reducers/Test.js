const TestReducer = (state = {
	hello: 'click me'
}, action) => {
	switch (action.type) {
	case 'SET_TEXT':
		return {
			...state,
			hello: action.text
		}
	default:
		return state
	}
}

export default TestReducer
