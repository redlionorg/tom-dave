import React from 'react'

const HeaderComponent = ({ loaded }) => (
	<div className={`header ${!!loaded ? 'loaded' : ''}`}>
		<img className="unlit" src="images/logo_unlit.jpg" />
		<img className="lit" src="images/logo_lit.jpg" />
	</div>
)
export default HeaderComponent