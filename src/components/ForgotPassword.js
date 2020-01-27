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
                console.log(data.error)
                this.setState({ error: data.error })
            } else {
                console.log(data.message)
                this.setState({ message: data.message, email: "" })
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h4 className="mt-5 mb-5">Password Reset</h4>
                {this.state.message && (
                    <h4 className="bg-success">{this.state.message}</h4>
                )}
                {this.state.error && (
                    <h4 className="bg-warning">{this.state.error}</h4>
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
