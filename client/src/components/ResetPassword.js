import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../auth';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: "",
            message: "",
            error: ""
        }
    }

    passwordReset = e => {
        e.preventDefault();
        this.setState({ message: "", error: ""})
        resetPassword({
            newPassword: this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        })
        .then(data => {
            if (data.error) {
                console.log(data.error)
                this.setState({
                    error: data.error
                })
            } else {
                console.log(data.message)
                this.setState({ message: data.message, newPassword: "" })
            }
        })
    }

    render() {
        const { message, error } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Reset Your Password</h2>
                {message && (
                    <div className="alert alert-primary">
                        Great! Now you can <Link to="/signin">login</Link> with your new password.
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
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={this.state.newPassword}
                            name="newPassword"
                            onChange={e => this.setState({ 
                                newPassword: e.target.value,
                                message: "",
                                error: "" 
                            })}
                            autoFocus
                        />
                    </div>
                    <br/>
                    <input type="submit" value="Reset Password" onClick={this.passwordReset} className="btn btn-raised btn-primary"/>
                </form>
            </div>
        )
    }
}
