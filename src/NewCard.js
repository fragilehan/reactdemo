import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import CardForm from './CardForm'
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
	addCard(card){
	  	console.log(JSON.stringify(card))
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    // Call the API to add the card on the server
    fetch(`${API_URL}/cards`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })

  }
	handleChange(field,value){
		console.log(this.props.history)
		this.setState({[field]:value});
	}
	handleSubmit(e){
		e.preventDefault()
		this.addCard(this.state)
		this.props.history.push('/',null);
	}
	handleClose(e){
		this.props.history.push('/',null);
	}
	render(){
		console.log(this.state);
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