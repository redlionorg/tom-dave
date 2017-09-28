import 'react'
import 'react-dom'
import { connect } from 'react-redux'
import HeaderComponent from '../components/Header'

const mapStateToProps = ({ BaseReducer }) => ({
	loaded: BaseReducer.loaded
})

const mapDispatchToProps = () => ({
})

const HeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderComponent)

export default HeaderContainer
