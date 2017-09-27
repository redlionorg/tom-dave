export const asyncAction = password => (
	new Promise((resolve) => {
		resolve(password)
	})
)

export const turnSignOn = () => ({ type: 'TURN_SIGN_ON' })
export const turnSignOff = () => ({ type: 'TURN_SIGN_OFF' })

export const loadingComplete = () => ({ type: 'LOADING_COMPLETE' })
