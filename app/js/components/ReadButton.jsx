import React from 'react'

const ReadButtonComponent = ({ entered }) => (
	<div className={`read-toggle listen ${!!entered ? 'show' : 'hide'}`}>
		<button className="read">read</button>
		<button className="listen">listen</button>
	</div>
)
export default ReadButtonComponent