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
        return (
            <div className="container">
                <h4 className="mt-5 mb-5">Reset Your Password</h4>
                {this.state.message && (
                    <h4 className="bg-success">Great, now you can <Link to="/signin">sign in. </Link>with your new password.</h4>
                )}
                {this.state.error && (
                    <h4 className="bg-warning">{this.state.error}</h4>
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
