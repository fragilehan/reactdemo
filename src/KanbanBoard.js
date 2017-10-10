import React , { Component } from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import List from './List';
import {Link} from 'react-router-dom'
import NewCard from './NewCard'
import {Router,Route} from 'react-router';

class KanbanBoard extends Component{
	render(){
		console.log(this.props)
		return(
			<div className = "app">
			 <Route path = "/new" component = {NewCard}/>
			 <Link to  ='/new' className="float-button"> + </Link>
			 <List id  ='todo' title="To Do" taskCallbacks={this.props.taskCallbacks} 
			 cardCallbacks ={this.props.cardCallbacks}
			 cards={
			 	this.props.cards.filter((card)=>card.status === "todo")
			 } />
			 <List id  ='in-progress' title="In Progress" taskCallbacks={this.props.taskCallbacks}
			 cardCallbacks ={this.props.cardCallbacks}
			  cards={
			 	this.props.cards.filter((card)=>card.status === "in-progress")
			 } />
			 <List id  ='done' title="Done" taskCallbacks={this.props.taskCallbacks}
			 cardCallbacks ={this.props.cardCallbacks}
			  cards={
			 	this.props.cards.filter((card)=>card.status === "done")
			 } />
			</div>
			)

	}
};
KanbanBoard.propTypes ={
	cards:PropTypes.arrayOf(PropTypes.object),
	taskCallbacks:PropTypes.object,
	cardCallbacks:PropTypes.object
}
export default DragDropContext(HTML5Backend)(KanbanBoard);