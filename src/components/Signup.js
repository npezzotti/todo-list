import React, { Component } from 'react';
import { signup } from '../auth';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name,
            email,
            password
        }
        signup(user)
        .then(data => {
            console.log(data)
            if (data.error) {
                return this.setState({ error: data.error })
            } else {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    open: true
                })
            }
        })
    }

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} value={name} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} value={email} type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} value={password} type="password" className="form-control" />
            </div>
            <button onClick={this.onSubmit} className="btn btn-raised btn-primary">
                Submit
            </button>
        </form>
    )

    render() {
        const { name, email, password, error, open } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                <div className="alert alert-primary" style={{ display: open ? "" : "none" }}>
                    New account successfully created- please <Link to="/signin">sign in.</Link>.
                </div>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}
