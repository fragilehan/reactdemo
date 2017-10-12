import React , { Component } from 'react'
import KanbanBoard from './KanbanBoard'
import 'whatwg-fetch'
import 'babel-polyfill'
import { throttle } from '../utils'
import {Container} from 'flux/utils'
import CardActionCreators from '../actions/CardActionCreators'
import CardStore from '../stores/CardStore'

const API_URL = 'https://kanbanapi.pro-react.com';
const API_HEADERS = {
	'Content-Type':'application/json',
	Authorization : 'mohantest11'
};
class KanbanBoardContainer extends Component{

	componentDidMount(){
		CardActionCreators.fetchCards()
	}
	render(){
		return <KanbanBoard cards={this.state.cards} 
				/>

	}

};
	KanbanBoardContainer.getStores=()=>([CardStore]);
	KanbanBoardContainer.calculateState =(prevState)=>({
		cards:CardStore.getState()
	})
export default Container.create(KanbanBoardContainer);