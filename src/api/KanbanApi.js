import 'whatwg-fetch'
import 'babel-polyfill'

const API_URL = 'https://kanbanapi.pro-react.com';
const API_HEADERS = {
	'Content-Type':'application/json',
	Authorization : 'mohantest'
};
let KanbanApi={
fetchCards(){
return fetch(API_URL+'/cards',{headers:API_HEADERS})
		.then((response) => response.json())
},
addCard(card){
return	fetch(`${API_URL}/cards`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    }).then((response)=>response.json())

},
addTask(cardId,task){
		return fetch(API_URL+"/cards/"+cardId+"/tasks/",{
			method:'post',
			headers: API_HEADERS,
			body:JSON.stringify(task)
		}).then((response)=>response.json());

	},
persistCardDrag(cardId,status,index){
	return 		fetch(API_URL+"/cards/"+cardId,{
			method:'put',
			headers:API_HEADERS,
			body:JSON.stringify({status:status,row_order_position:index})
		}).then((response)=>response.json())
},
toggleTask(cardId,task){
	return fetch(API_URL+"/cards/"+cardId+"/tasks/"+task.id,{
			method:'put',
			headers:API_HEADERS,
			body:JSON.stringify({done:!task.done})
		})
},
deleteTask(cardId,task){
	return fetch(API_URL+"/cards/"+cardId+"/tasks/"+task.id,{
			method:'delete',
			headers:API_HEADERS,
			body:JSON.stringify({done:!task.done})
		})

}

}
export default KanbanApi