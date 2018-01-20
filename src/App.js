import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the cat', isCompleted: true },
        { description: 'Throw the dishes away', isCompleted: false },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newTodoDescription: ''
    };
  }

  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }

  toggleComplete(index) {
    const localTodos = this.state.todos.slice();
    const todo = localTodos[index];
    todo.isCompleted = !todo.isCompleted;
    this.setState({ todos: localTodos });
  }

  deleteTodo(index) {
    const localTodos = this.state.todos.slice();
    const newTodos = localTodos.filter((todo, i) => i !== index);
    //const whatev = localToDos.filter(function(todo, i) {
    //  return i !== index;
    //});
    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div className="App">
       <ul>
       { this.state.todos.map( (todo, index) =>
         <ToDo key={ index }
          toDoIndex={ index }
          description={ todo.description }
          isCompleted={ todo.isCompleted }
          toggleComplete={ () => this.toggleComplete(index) }
          deleteTodo={ () => this.deleteTodo(index) }
          />
       )}
       </ul>
       <form onSubmit={ (e) => this.handleSubmit(e) }>
         <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
         <input type="submit" />
       </form>
      </div>
    );
  }
}

export default App;
