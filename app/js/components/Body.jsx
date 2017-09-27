import React from 'react'
import LoadingContainer from '../containers/Loading'
import ReadButtonComponent from '../components/ReadButton'

const BodyComponent = () => (
	<div className="body">
		<LoadingContainer />
		<ReadButtonComponent />
	</div>
)
export default BodyComponent