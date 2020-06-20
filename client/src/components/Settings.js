import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth';
import EditProfile from './EditProfile';
import Spinner from './Spinner';
export default class Settings extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            open: false,
            redirect: false
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        fetch(`/users/${userId}`, {
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
            this.setState({ user: data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?");
        if (answer) {
            this.remove()
        }
    }

    remove = () => {
        const userId = this.state.user._id;
        const token = isAuthenticated().token;
        fetch(`/users/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            signout(() => {
                this.setState({
                    redirect: true
                })
                return response.json()
            })
        })
        .catch(err => console.log(err));
    }

    flip = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { user, open } = this.state;
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <>
            {user && open ? (
                <EditProfile user={user} flip={this.flip} getUser={this.getUser} />
                ) : (
                    this.state.user ? 
                    <div className="container">
                        <h3 className="mt-5 mb-5">Hi {user.name}</h3>
                        <div className="col-md-8">
                            <div className="lead mt-2">
                                <p>Email: {user.email}</p>
                                <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
                            </div>
                            <div className="d-inline-block">
                                <button className="btn btn-raised btn-primary mr-2" onClick={this.flip}>Edit</button>
                                <button onClick={this.deleteConfirmed} className="btn btn-raised btn-warning">Delete Account</button>
                            </div>
                        </div>
                    </div>
                    :
                    <Spinner/>
                )
            }
            </>
        )
    }
}
