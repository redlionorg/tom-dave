import 'react'
import 'react-dom'
import { connect } from 'react-redux'
import BodyComponent from '../components/Body'
import * as BaseActions from '../actions/Base'

const mapStateToProps = ({ BaseReducer }) => ({
	loaded: BaseReducer.loaded,
	entered: BaseReducer.hasEntered
})

const mapDispatchToProps = dispatch => ({
	loadComplete: () => { dispatch(BaseActions.loadingComplete()) },
	enter: () => { dispatch(BaseActions.shouldEnter()) }
})

const BodyContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BodyComponent)

export default BodyContainer
