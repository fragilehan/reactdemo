import AppDispatcher from '../AppDispatcher'
import constants from '../constants'
import KanbanApi from '../api/KanbanApi'
import { throttle } from '../utils'
import CardStore from '../stores/CardStore'
let CardActionCreators = {
 fetchCards(){
 	AppDispatcher.dispatchAsync(KanbanApi.fetchCards(),{
 		request:constants.FETCH_CARDS,
 		success:constants.FETCH_CARDS_SUCCESS,
 		failure:constants.FETCH_CARDS_ERROR
 	})
 },
 addCard(card){
 	AppDispatcher.dispatchAsync(KanbanApi.addCard(card),{
 		request:constants.CREATE_CARD,
 		success:constants.CREATE_CARD_SUCCESS,
 		failure:constants.CREATE_CARD_ERROR
 	})
 },
persistCardDrag(cardProps){
	let card = CardStore.getCard(cardProps.id)
	let cardIndex = CardStore.getCardIndex(cardProps.id)
	 	AppDispatcher.dispatchAsync(KanbanApi.persistCardDrag(card.id,card.status,cardIndex),{
 		request:constants.PRESIST_CARD_DRAG,
 		success:constants.PRESIST_CARD_DRAG_SUCCESS,
 		failure:constants.PRESIST_CARD_DRAG_ERROR
 	})
},
 updateCardStatus: throttle((cardId,listId)=>{
 	AppDispatcher.dispatch({
 		type:constants.UPDATE_CARD_STATUS,
 		payload:{cardId,listId}
 	})
 },500),
 updateCardPosition:throttle((cardId, afterId)=>{
 	 	AppDispatcher.dispatch({
 		type:constants.UPDATE_CARD_POSITION,
 		payload:{cardId,afterId}
 	})
 })
}
export default CardActionCreators