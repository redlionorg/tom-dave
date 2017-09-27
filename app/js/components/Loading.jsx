import React from 'react'
import * as BaseActions from '../actions/Base'
import LoadingService from '../services/Loading'

export default class LoadingComponent extends React.Component {
	componentWillMount() {
		LoadingService.on('loaded', this.props.loadComplete)
	}

	render() {
		return (
			<div className="loading">
				<div className="airpod-wrapper">
					<div className="airpods">
						<img className="airpod left" src="images/airpod.png" />
						<img className="airpod right" src="images/airpod.png" />
					</div>
					<img className="foreground" src="images/airpods_top_layer.png" />
					<img className="background" src="images/airpods_bottom_layer.jpg" />
				</div>
				<p className={`${!!this.props.loaded ? 'show' : 'hide'}`}>This site is best experienced with the sound turned on</p>
				<button className={`enter ${!!this.props.loaded ? 'show' : 'hide'}`}>enter</button>
			</div>
		)
	}
}