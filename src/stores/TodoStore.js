import AppDispatcher from "../dispatcher/AppDispatcher"
import { EventEmitter } from "events"
import TodoConstants from "../constants/TodoConstants"
import assign from "object-assign"

var CHANGE_EVENT = 'change'

var _todos = {} // 初期化

/*
*  ここから処理本体を書き始める
*/
var create = (text) => {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    text: text
  }
}

var destroy = (id) => {
  delete _todos[id]
}

var TodoStore = assign({},EventEmitter.prototype,{

  getAll(){
    return _todos
  },

  emitChange(){
    this.emit(CHANGE_EVENT)
  },

  addChangeListener(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback)
  }

})

AppDispatcher.register((action)=>{
  var text;

  switch(action.actionType){
    case TodoConstants.TODO_CREATE:
      text = action.text.trim()
      if(text !== ''){
        create(text)
        TodoStore.emitChange()
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id)
      TodoStore.emitChange()
      break;

    default:
      // no
  }
})
export default TodoStore