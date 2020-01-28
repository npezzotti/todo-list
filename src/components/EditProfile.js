import React, { Component } from 'react';
import { isAuthenticated, updateUser } from '../auth';

export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            password: "",
            error: "",
            loading: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    onSubmit =  async event => {
        event.preventDefault();
        if (this.isValid()) {
            this.setState({ loading: true })
            const token = isAuthenticated().token;
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            fetch(`http://localhost:3001/users/${this.props.user._id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                const tokenData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
                updateUser(tokenData, () => {
                    this.props.getUser()
                    this.props.flip()
    
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    isValid = () => {
        const { name, email, password } = this.state;

        if(name.length === 0) {
            this.setState({error: "Name is required"})
            return false
        }
        if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            this.setState({error: "Valid email is required"})
            return false
        }
        if(password.length > 0 && password.length < 6) {
            this.setState({error: "Password must be more than 5 characters."})
            return false;
        }
        return true;
    }

    editForm = (name, email, password) => (
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
            <button onClick={this.onSubmit} className="btn btn-raised btn-primary mr-2">
                Update
            </button>
            <button onClick={this.props.flip} className="btn btn-raised btn-success">
                Back
            </button>
        </form>
    )

    render() {
        const { name, email, password, error, loading } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Info</h2>
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
                {this.editForm(name, email, password)}
            </div>
        )
    }
}