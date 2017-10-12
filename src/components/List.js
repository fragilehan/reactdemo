import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { DropTarget} from 'react-dnd';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators'

const listTargetSpec = {
	hover(props,monitor){
		const draggedId = monitor.getItem().id;
		CardActionCreators.updateCardStatus(draggedId,props.id)
	}
}
function collect(connect,monitor){
	return{
		connectDropTarget: connect.dropTarget()
	}
}
class List extends Component{
	render(){
		const { connectDropTarget } =this.props;
		let cards = this.props.cards.map((card) => {
			return <Card key = {card.id}
						{...card}/>

		});

	 	return connectDropTarget(
	 		<div className = "List">
	 		<h1>{this.props.title}</h1>
	 		{cards}
	 		</div>
	 		)
	}
};
List.propTypes = {
	title: PropTypes.string.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object),
	connectDropTarget:PropTypes.func.isRequired
}
export default DropTarget(constants.CARD,listTargetSpec,collect)(List);