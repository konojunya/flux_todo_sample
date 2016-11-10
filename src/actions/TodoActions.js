import AppDispatcher from "../dispatcher/AppDispatcher"
import TodoConstants from "../constants/TodoConstants"

var TodoActions = {

	create(text){
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		})
	},

	destroy(id){
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		})
	}

}

export default TodoActions