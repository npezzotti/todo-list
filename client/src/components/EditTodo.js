import React, {Component} from 'react';
import { isAuthenticated } from '../auth';
import Spinner from './Spinner';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_description: '',
            todo_notes: '',
            todo_priority: '',
            todo_completed: false,
            error: "",
            loading: false
        }
    }

    componentDidMount() {
        this.getTodoById();
    };

    getTodoById = () => {
        this.setState({ loading: true })
        axios.get('/api/v1/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_notes: response.data.todo_notes,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed,
                    loading: false
                })
            })
            .catch(function(error) {
                console.log(error);
        })
    }

    handleChange = (e) => {
        if (e.target.name === "todo_completed") {
            this.setState({
                todo_completed: !this.state.todo_completed
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    onChangeTodoCompleted = () => {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const updatedTodo = {
            todo_description: this.state.todo_description,
            todo_notes: this.state.todo_notes,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        if (!updatedTodo.todo_description) {
            return this.setState({ error: "Description required"})
        }
        if (!updatedTodo.todo_priority) {
            return this.setState({ error: "Priority required"})
        }
        if (updatedTodo.todo_notes.length > 50 || updatedTodo.todo_description.length > 50) {
            return this.setState({ error: "Text fields must be under 50 characters."})
        }

        const token = isAuthenticated().token;

        fetch('/api/v1/todos/' + this.props.match.params.id, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedTodo)
        })
        .then(response => {
            this.props.history.push('/');
        })
        .catch(error => console.log(error));
    }

    render() {
        const { todo_description, todo_notes, todo_priority, todo_completed, error, loading } = this.state;
        return (
            <>
                {loading ? (
                    <Spinner/>
                ) : (
                    <>
                        <div>
                            <h3 className="mt-5 mb-5">Update Todo</h3>
                            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                                {error}
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group"> 
                                    <label>Description: </label>
                                    <input  type="text"
                                            name="todo_description"
                                            className="form-control"
                                            value={todo_description}
                                            onChange={this.handleChange}
                                            />
                                </div>
                                <div className="form-group">
                                    <label>Notes: </label>
                                    <input 
                                            type="text" 
                                            name="todo_notes"
                                            className="form-control"
                                            value={todo_notes}
                                            onChange={this.handleChange}
                                            />
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-inline">
                                        <input  className="form-check-input" 
                                                type="radio" 
                                                name="todo_priority" 
                                                id="priorityLow" 
                                                value="Low"
                                                checked={todo_priority==='Low'} 
                                                onChange={this.handleChange}
                                                />
                                        <label className="form-check-label">Low</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input  className="form-check-input" 
                                                type="radio" 
                                                name="todo_priority" 
                                                id="priorityMedium" 
                                                value="Medium" 
                                                checked={todo_priority==='Medium'} 
                                                onChange={this.handleChange}
                                                />
                                        <label className="form-check-label">Medium</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input  className="form-check-input" 
                                                type="radio" 
                                                name="todo_priority" 
                                                id="priorityHigh" 
                                                value="High" 
                                                checked={todo_priority==='High'} 
                                                onChange={this.handleChange}
                                                />
                                        <label className="form-check-label">High</label>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input  className="form-check-input"
                                            id="completedCheckbox"
                                            type="checkbox"
                                            name="todo_completed"
                                            onChange={this.handleChange}
                                            checked={todo_completed}
                                            value={todo_completed}
                                            />
                                    <label className="form-check-label" htmlFor="completedCheckbox">
                                        Completed
                                    </label>                        
                                </div>
                                <br />
                                <input type="submit" value="Update Todo" className="btn btn-raised btn-primary" />
                            </form>
                        </div>
                    </>
                )}
            </>
        )
    }
}