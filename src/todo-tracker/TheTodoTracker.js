import { Component } from 'react';
import { deleteToDo, getToDos, addToDo, updateTodoCompleted } from '../utils/ToDoApp';
import './TheTodoTracker.css';

export default class todoTracker extends Component {
  state = {
    task: '',
    completed: false,
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
    const { todoTask, todos, completed } = this.state;

    try {
      const addedToDo = await addToDo({ task: todoTask, completed });
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

  handleCompletedChecked = async (todo) => {
    try {
      todo.completed = !todo.completed;
      const updatedTodo = await updateTodoCompleted(todo);
      const updatedNewTodos = this.state.todos.map(todo => {
        return todo.id === updatedTodo.id ? updatedTodo : todo;
      });
      this.setState({ todos: updatedNewTodos });
    }
    catch (err) {
      console.log(err);
    }
  }


  handleDelete = async id => {
    const { todos } = this.state;

    try {

      await deleteToDo(id);

      const updatedTodos = todos.filter(todo => todo.id !== id);
      this.setState({ todos: updatedTodos });
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
          <input value={todoTask} onChange={this.handleTodoNameChange} />
        </form>

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <h2>{todo.task}</h2>
              <input type="checkbox" value={todo.completed}
                onChange={() => this.handleCompletedChecked(todo)} />
              <span>{todo.completed} {todo.completed === false ? 'Complete' : 'Completed'}</span>
              {/* <button className="complete" onClick={() => this.handleComplete(todo.id)}>🤠</button> */}
              <button className="delete" onClick={() => this.handleDelete(todo.id)}>☠️</button>
            </li>
          ))}
        </ul>

      </div>
    );
  }

}