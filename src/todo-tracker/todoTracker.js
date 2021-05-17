import { Component } from 'react';
import { deleteToDo, getToDos, addToDo } from '../utils/ToDoApp';
import './todoTracker.css';

export default class todoTracker extends Component {
  state = {
    todoTask: '',
    todos: []
  }

  async componentDidMount() {
    try {
      const todos = await getToDos();
      this.setState({ todos: todos });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleAdd = async e => {
    e.preventDefault();
    const { todoTask, todos } = this.state;

    try {
      const addedToDo = await addToDo ({ name : todoTask });
      const updatedToDos = [...todos, addedToDo];
      this.setState({
        todos: updatedToDos,
        todoTask: ''
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }
  
  handleTodoNameChange = ({ target }) => {
    this.setState({ todoTask: target.value });
  }

  handleDelete = async id => {
    const { todos } = this.state;  

    try {

      await deleteToDo(id);
      
      const updatedTodos = todos.filter(todo => todo.id !== id);
      this.setState.state({ todos: updatedTodos });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    const { todoTask, todos } = this.state;

    return (
      <div className="todoTracker">

        <form onSubmit={this.handleAdd}>
          Add a new todo:
          <input value={todoTask} onChange={this.handleTodoNameChange}/>
        </form>
        
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <h2>{todo.task}</h2>
              <span>{todo.completed} {todo.completed === 1 ? 'Complete' : 'Completed'}</span>
              <button className="complete" onClick={() => this.handleComplete(todo.id)}>🤠</button>
              <button className="delete" onClick={() => this.handleDelete(todo.id)}>☠️</button>
            </li>
          ))}
        </ul>
        
      </div>
    );
  }

}