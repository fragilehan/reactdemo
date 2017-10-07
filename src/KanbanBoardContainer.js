import React , { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import { throttle } from './utils'
const API_URL = 'https://kanbanapi.pro-react.com';
const API_HEADERS = {
	'Content-Type':'application/json',
	Authorization : 'mohantest11'
};
class KanbanBoardContainer extends Component{
	constructor(){
		super(...arguments);
		this.state = {
			cards:[],
		};
		this.updateCardStatus =  throttle(this.updateCardStatus.bind(this));
		this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
	}
	addTask(cardId,taskName){
		let cardIndex =this.state.cards.findIndex((card)=>card.id==cardId);
		let newTask = {id:Date.now(),name:taskName,done:false};
		console.log(newTask);
		let nextState =[...this.state.cards];
		nextState[cardIndex].tasks.push(newTask);
		console.log(nextState);
		this.setState({cards:nextState});
					fetch(API_URL+"/cards/"+cardId+"/tasks/",{
			method:'post',
			headers: API_HEADERS,
			body:JSON.stringify(newTask)
		});

	}
	deleteTask(cardId,taskId,taskIndex){
		let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
		console.log(cardIndex);
		let nextState =[...this.state.cards];
		console.log(nextState[cardIndex]);
		console.log(taskIndex);
		nextState[cardIndex].tasks.splice(taskIndex,1);
		console.log(nextState);
		this.setState({cards:nextState});
			fetch(API_URL+"/cards/"+cardId+"/tasks/"+taskId,{
			method:'delete',
			headers: API_HEADERS
		})
	}
	toggleTask(cardId,taskId,taskIndex){
		let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
		let newDoneValue;
		let nextState =[...this.state.cards];
		newDoneValue = !nextState[cardIndex].tasks[taskIndex].done;
		fetch(API_URL+"/cards/"+cardId+"/tasks/"+taskId,{
			method:'put',
			headers:API_HEADERS,
			body:JSON.stringify({done:newDoneValue})
		})

	}
	updateCardStatus(cardId,listId){
		let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
		let card = this.state.cards[cardIndex];
		let nextState =[...this.state.cards];
		if(card.status !==listId){
				nextState[cardIndex].status=listId;
				console.log(nextState);
				this.setState(nextState);
		}
	}
	updateCardPosition(cardId, afterId){
		if(cardId!==afterId){
			let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
			let card = this.state.cards[cardIndex];
			let afterIndex = this.state.cards.findIndex((card=>card.id)== afterId);
			let nextState =[...this.state.cards];
			nextState.cards.splice(cardIndex,1);
			nextState.cards.splice(afterIndex,0,card);
			console.log(nextState);
			this.setState(nextState);
		}

	}
	persistCardDrag(cardId,status){
		let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
		let card = this.state.cards[cardIndex];
		fetch(API_URL+"/cards/"+cardId,{
			method:'put',
			headers:API_HEADERS,
			body:JSON.stringify({status:card.status,row_order_position:cardIndex})
		})
	}
	componentDidMount(){
		fetch(API_URL+'/cards',{headers:API_HEADERS})
		.then((response) => response.json())
		.then((responseData) =>{
			this.setState({cards:responseData});
		}).catch((error)=>{
			console.log('Error',error);
		})
	}
	render(){
		return <KanbanBoard cards={this.state.cards} 
				taskCallbacks={
					{
						toggle: this.toggleTask.bind(this),
						delete: this.deleteTask.bind(this),
						add: this.addTask.bind(this)
					}
				}
				cardCallbacks={{
					updateCardStatus:this.updateCardStatus.bind(this),
					updateCardPosition:this.updateCardPosition.bind(this),
					persistCardDrag:this.persistCardDrag.bind(this)
				}
				}
				/>

	}
};
export default KanbanBoardContainer;