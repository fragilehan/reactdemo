import AppDispatcher from '../AppDispatcher'
import constants from '../constants'
import {ReduceStore} from 'flux/utils'
class CardStore extends ReduceStore{
	getInitialState(){
		return []
	}
	getCard(id){
	return this._state.find((card)=>card.id == id);
	}
	getCardIndex(id){
	return this._state.findIndex((card)=>card.id == id);
	}
	reduce(state,action){
		let cardIndex,nextState
		switch (action.type){
			case constants.FETCH_CARDS_SUCCESS:
			return action.payload.response


			case constants.CREATE_CARD:
			return state

			case constants.CREATE_CARD_SUCCESS:
			return [...state,action.payload.response]

			case constants.UPDATE_CARD_STATUS:
			cardIndex = this.getCardIndex(action.payload.cardId)
			nextState =  [...state]
			nextState[cardIndex].status=action.payload.listId
			return nextState

			case constants.UPDATE_CARD_POSITION:
			if(action.payload.cardId!=action.payload.afterId){
				console.log(action)
				cardIndex = this.getCardIndex(action.payload.cardId)
				let card = state[cardIndex]
				let afterIndex = this.getCardIndex(action.payload.afterId)
							nextState =  [...state]
							nextState.splice(cardIndex,1);
							nextState.splice(afterIndex,0,card);
						return nextState
			}
			case constants.CREATE_TASK_SUCCESS:
				cardIndex = this.getCardIndex(action.payload.cardId)
				nextState =[...state];
				nextState[cardIndex].tasks.push(action.payload.response);
				return nextState
			case constants.DELETE_TASK_SUCCESS:
				cardIndex = this.getCardIndex(action.payload.cardId)
				nextState =[...state];
				nextState[cardIndex].tasks.splice(action.payload.taskId,1);
				return nextState

			default:
			return state
		}
	}
}
export default new CardStore(AppDispatcher)