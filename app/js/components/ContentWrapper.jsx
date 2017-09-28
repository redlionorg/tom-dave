import React from 'react'

const ContentWrapperComponent = ({ entered }) => (
	<div className={`content-wrapper ${!!entered ? 'entered' : ''}`}>
		
	</div>
)
export default ContentWrapperComponent