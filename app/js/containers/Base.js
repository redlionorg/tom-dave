import 'react'
import 'react-dom'
import { connect } from 'react-redux'
import BaseComponent from '../components/Base'
import * as BaseActions from '../actions/Base'
import LoaderService from '../services/Loader'

const mapStateToProps = ({ BaseReducer }) => ({

})

const mapDispatchToProps = dispatch => ({
	
})

const BaseContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BaseComponent)

export default BaseContainer
