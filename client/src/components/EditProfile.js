import React, { Component } from 'react';
import { isAuthenticated, updateUser } from '../auth';
import Loader from 'react-loader-spinner';
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
        this.setState({ loading: true })
        const token = isAuthenticated().token;
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        fetch(`/users/${this.props.user._id}`, {
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
            if (data.error) {
                return this.setState({ error: data.error, loading: false })
            } else {
                const tokenData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email
                }
                updateUser(tokenData, () => {
                    this.props.getUser()
                    this.props.flip()    
                })
            }
        })
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
                <label className="text-muted">Password (change or enter old password for authentication)</label>
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
            <>
                {loading ? (
                    <div
                    style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                    >
                        <Loader type="ThreeDots" color="#5A5A5A" height="100" width="100" />
                    </div>
                ) : (
                    <div className="container">
                        <h3 className="mt-5 mb-5">Edit Info</h3>
                        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                            {error}
                        </div>
                        {this.editForm(name, email, password)}
                    </div>
                )}
            </>
        )
    }
}