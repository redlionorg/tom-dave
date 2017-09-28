import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import AppReducer from './js/reducers'
import BaseComponent from './js/components/Base'

require('./index.scss')

const store = createStore(
	AppReducer,
	applyMiddleware(
		thunk,
		logger
	)
)

ReactDOM.render(
	(
		<Provider store={store}>
			<BaseComponent />
		</Provider>
	),
	document.getElementById('app')
)