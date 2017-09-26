export const setText = () => ({ text: 'hello', type: 'SET_TEXT' })

export const asyncAction = password => (
	new Promise((resolve) => {
		resolve(password)
	})
)
