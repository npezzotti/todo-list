import React, {Component} from 'react';
import axios from 'axios';
import { isAuthenticated } from '../auth';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: "",
            todo_notes: "",
            todo_priority: "",
            todo_completed: false,
            error: "",
            loading: false
        }
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value,
            error: ""
        })
    }

    async onSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true })
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_notes: this.state.todo_notes,
            todo_priority: this.state.todo_priority,
            todo_completed: false,
            postedBy: isAuthenticated().user._id
        }

        if (!newTodo.todo_description) {
            return this.setState({ error: "Description required"})
        }
        if (!newTodo.todo_priority) {
            return this.setState({ error: "Priority required"})
        }
        if (newTodo.todo_notes.length > 50 || newTodo.todo_description.length > 50) {
            return this.setState({ error: "Text fields must be under 50 characters."})
        }

        await axios.post('http://localhost:3001/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_notes: '',
            todo_priority: '',
            todo_completed: false
        })
        this.props.history.push('/');

    }
    render() {
        const { todo_description, todo_notes, todo_priority, error, loading } = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading</h2>
                    </div> 
                ) : (
                    ""
                )}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input 
                            type="text"
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
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-raised btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}