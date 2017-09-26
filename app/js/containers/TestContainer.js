import 'react-dom'
import { connect } from 'react-redux'
import * as TestActions from '../actions/Test'
import TestComponent from '../components/Test'

const mapStateToProps = ({ TestReducer }) => ({
	...TestReducer
})

const mapDispatchToProps = dispatch => ({
	updateText: () => { dispatch(TestActions.setText()) }
})

const TestContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(TestComponent)

export default TestContainer
