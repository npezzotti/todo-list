import React, { Component } from 'react';
import { forgotPassword } from '../auth'

export default class ForgotPassword extends Component {
    state = {
        email: "",
        message: "",
        error: ""
    }

    forgot_password = e => {
        e.preventDefault();
        this.setState({ message: "", error: ""})
        forgotPassword(this.state.email)
        .then(data => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                this.setState({ message: data.message, email: "" })
            }
        })
    }

    render() {
        const { message, error } = this.state;
        return (
            <div className="container">
                <h4 className="mt-5 mb-5">Password Reset</h4>
                {message && (
                    <div className="alert alert-primary">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}
                <form>
                    <div>
                        <input 
                            type="email"
                            className="form-control"
                            placeholder="Your Email Address"
                            value={this.state.email}
                            name="email"
                            onChange={e => this.setState({ 
                                email: e.target.value,
                                message: "",
                                error: "" 
                            })}
                            autoFocus
                        />
                    </div>
                    <br/>
                    <input type="submit" value="Send Password Reset Link" onClick={this.forgot_password} className="btn btn-raised btn-primary"/>
                </form>
            </div>
        )
    }
}
