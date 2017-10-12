import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import CardForm from './CardForm'
import CardActionCreators from '../actions/CardActionCreators'

const API_URL = 'https://kanbanapi.pro-react.com';
const API_HEADERS = {
	'Content-Type':'application/json',
	Authorization : 'mohantest11'
};
class NewCard extends Component{
	componentWillMount(){
		this.setState({
			id:Date.now(),
			title:'',
			description:'',
			status:'todo',
			color:'#c9c9c9',
			tasks:[]
		});
	}
	handleChange(field,value){
		this.setState({[field]:value});
	}
	handleSubmit(e){
		e.preventDefault()
		CardActionCreators.addCard(this.state)
		this.props.history.push('/',null);
	}
	handleClose(e){
		this.props.history.push('/',null);
	}
	render(){
		return (
			<CardForm draftCard = {this.state}
			buttonLabel = "Create Card"
			handleChange ={this.handleChange.bind(this)}
			handleClose ={this.handleClose.bind(this)}
			handleSubmit = {this.handleSubmit.bind(this)}
			/>
			)
	}
}
NewCard.PropTypes = {
	cardCallbacks: PropTypes.object,
}
export default NewCard;