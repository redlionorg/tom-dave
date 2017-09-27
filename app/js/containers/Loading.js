import 'react'
import 'react-dom'
import { connect } from 'react-redux'
import LoadingComponent from '../components/Loading'
import * as BaseActions from '../actions/Base'

const mapStateToProps = ({ BaseReducer }) => ({
	loaded: BaseReducer.loaded
})

const mapDispatchToProps = dispatch => ({
	loadComplete: () => { dispatch(BaseActions.loadingComplete()) }
})

const LoadingContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoadingComponent)

export default LoadingContainer
