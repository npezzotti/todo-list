import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td style={{textDecoration: props.todo.todo_completed ? 'line-through' : ''}}>{props.todo.todo_description}</td>
        <td style={{textDecoration: props.todo.todo_completed ? 'line-through' : ''}}>{props.todo.todo_notes}</td>
        <td style={{textDecoration: props.todo.todo_completed ? 'line-through' : ''}}>{props.todo.todo_priority}</td>
        <td>
            <Link className="text-primary" to={"/edit/" + props.todo._id}>Edit</Link> | <a className="text-warning" href="/" onClick={() => { props.deleteTodo(props.todo._id) }}>Delete</a>
        </td>
    </tr>
)

export default class TodosList extends Component {
    constructor(props) {
        super(props);

        this.todoList = this.todoList.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.state = {todos: []};
    };

    componentDidMount() {
        axios.get('http://localhost:3001/todos')
        .then(response => {
            this.setState({ todos: response.data })
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    async deleteTodo(id) {
        await axios.delete('http://localhost:3001/todos/delete/' + id)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    todoList() {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo deleteTodo={this.deleteTodo} todo={currentTodo} key={i} />
        })
    }

    render() {
        return (
            <div>
                <h3 className="lead">Todos List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Notes</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        );
    };
};