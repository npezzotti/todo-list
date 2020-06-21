import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Spinner from './Spinner';

const Todo = props => (
    <tr>
        <td style={{textDecoration: props.todo.todo_completed ? 'line-through' : ''}}>{props.todo.todo_description}</td>
        <td style={{textDecoration: props.todo.todo_completed ? 'line-through' : ''}}>{props.todo.todo_notes}</td>
        <td style={{textDecoration: props.todo.todo_completed ? 'line-through' : ''}}>{props.todo.todo_priority}</td>
        <td>
            <Link className="text-primary" to={`/edit/${props.todo._id}`}>Edit</Link> | <span className="text-danger" onClick={ () => props.deleteTodo(props.todo._id) }>Delete</span>
        </td>
    </tr>
)

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [], loading: false };
    };

    getTodos = () => {
        this.setState({loading: true})
        const token = isAuthenticated().token;
        const userId = isAuthenticated().user._id
        fetch(`/api/v1/todos/postedBy/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            this.setState({ todos: data, loading: false })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getTodos()
    };

    deleteTodo = (id) => {
        this.setState({ loading: true });
        const token = isAuthenticated().token;

        fetch(`/api/v1/todos/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            this.getTodos();
        })
        .catch(error => console.log(error));
    };

    todoList = () => {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo deleteTodo={this.deleteTodo} todo={currentTodo} key={i} />
        })
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <Spinner/>
                ) : (
                    <>
                    <h3 className="lead">{isAuthenticated().user.name}'s Todos</h3>
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
                    </>
                )}
            </div>
        );
    };
};