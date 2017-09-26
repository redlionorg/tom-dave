import React from 'react'

export default class TestComponent extends React.Component {
	render() {
		return (
			<div id="test" onClick={this.props.updateText}>{this.props.hello}</div>
		)
	}
}