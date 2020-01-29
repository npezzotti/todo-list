import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from "../favicon.ico";
import { signout, isAuthenticated } from '../auth';

function NavBar({ history }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
                <img src={logo} width="30" height="30" alt="Logo" />
                {" "}My Todo List
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Todo</Link>
                </li>              
                {isAuthenticated() && (
                    <>
                        <li className="navbar-item">
                            <Link to='/settings' className="nav-link">Settings</Link>
                        </li>
                        <li className="navbar-item">
                            <span className="nav-link" style={{cursor: "pointer"}} onClick={() => signout(() => history.push('/'))}>
                                Sign out
                            </span>
                        </li>
                    </>
                )}
            </ul>
          </div>
        </nav>
    )
}

export default withRouter(NavBar)
