import React from "react"
import TodoStore from "../stores/TodoStore"
import TodoActions from '../actions/TodoActions';

var getTodoState = () => {
	return TodoStore.getAll()
}

export default class TodoApp extends React.Component {

	constructor(){
		super()
		this.state = {
			value: "",
			todos: getTodoState()
		}
	}

	componentDidMount(){
		TodoStore.addChangeListener(this._onChange.bind(this))
	}

	componentWillUnmount(){
		TodoStore.removeChangeListener(this._onChange.bind(this));
	}

	render(){
		var todoElements = [];
		var todos = this.state.todos;
		for(var key in todos){
			todoElements.push( // todoの分だけ配列に追加する
				<li key={key} id={todos[key].id}>
					<span style={{marginRight: "30px"}}>{todos[key].text}</span>
					<button onClick={this._destroy.bind(this)}>&times;</button>
				</li>
			)
		}
		return(
			<div>
			  <input type="text" value={this.state.value} onChange={this._Input.bind(this)}/>
			  <button onClick={this._submit.bind(this)}>Add.</button>
				<ul>
					{todoElements} {/*配列を展開する*/}
				</ul>
			</div>
		)
	}

	_destroy(e){
		var id = e.target.parentNode.id
		TodoActions.destroy(id) // 消したい投稿のidを渡すだけ！
	}

	_submit(){
		TodoActions.create(this.state.value) // テキストを渡すだけ！
		this.setState({ // 追加したら入力欄は空にする
			value: ""
		})
	}

	_Input(e){ // 入力中(onChange)でstateを書き換える	
		this.setState({
			value: e.target.value
		})
	}

	_onChange(){
		this.setState(getTodoState())
	}

}