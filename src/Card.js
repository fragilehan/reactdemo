import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckList from './CheckList';
import constants from './constants';
import { DragSource} from 'react-dnd'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const cardDragSpec = {
	beginDrag(props) {
		return {
			id: props.id
		}
	},
	endDrag(props){
		props.cardCallbacks.persistCardDrag(props.id,props.status);
	}
}
let collectDrag = (connect,monitor)=>{
	return {
		connectDragSource:connect.dragSource()
	}
}
class Card extends Component{
	constructor(){
		super(...arguments);
		this.state={
			showDetail:true
		}
	}
	toggleDetail(){
		this.setState({showDetail:!this.state.showDetail});
	}
	render(){
		const { connectDragSource} = this.props;
		let cardDetails;
		if(this.state.showDetail){
			cardDetails =(
		<div className = "card_details">
			{this.props.description}
			<CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks = {this.props.taskCallbacks}/>
		</div>

				);
		}
		let sideColor ={
			position:'absolute',
			zIndex: -1,
			top:0,
			bottom:0,
			left:0,
			width: 7,
			backgroundColor: this.props.color
		};

		return connectDragSource(
		<div className = "card">
		<div style={sideColor}/>
		<div className = {this.state.showDetail?"card_title card_title--is-open":"card_title"} onClick ={this.toggleDetail.bind(this)}>{this.props.title}</div>
		<ReactCSSTransitionGroup
      transitionName="toggle"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
      transitionEnter={true}
      transitionLeave={true}>
         
		{cardDetails}
	 </ReactCSSTransitionGroup>
		</div>


		)
	}
}
Card.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	description:PropTypes.string,
	color:PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object,
	cardCallbacks:PropTypes.object,
	connectDragSource:PropTypes.func.isRequired

}
export default DragSource(constants.CARD,cardDragSpec,collectDrag)(Card);