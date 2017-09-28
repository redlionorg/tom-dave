export const asyncAction = password => (
	new Promise((resolve) => {
		resolve(password)
	})
)

export const loadingComplete = () => ({ type: 'LOADING_COMPLETE' })
export const shouldEnter = () => ({ type: 'SHOULD_ENTER' })
