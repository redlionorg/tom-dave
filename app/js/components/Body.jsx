import React from 'react'
import LoadingComponent from '../components/Loading'
import ReadButtonComponent from '../components/ReadButton'
import ContentWrapperComponent from '../components/ContentWrapper'

const BodyComponent = ({ loaded, entered, loadComplete, enter }) => (
	<div className="body">
		<LoadingComponent loaded={loaded} loadComplete={loadComplete} enter={enter} />
		<ReadButtonComponent entered={entered} />
		<ContentWrapperComponent entered={entered} />
	</div>
)
export default BodyComponent