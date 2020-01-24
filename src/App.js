import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute'
import TodosList from './components/TodosList';
import EditTodo from './components/EditTodo';
import CreateTodo from './components/CreateTodo';
import Signup from './components/Signup';
import Signin from './components/Signin';
import logo from "./favicon.ico";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="30" height="30" alt="Logo" />
            {" "}My Todo List
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
        <PrivateRoute path='/' exact component={TodosList} />
        <PrivateRoute path='/edit/:id' component={EditTodo} />
        <PrivateRoute path='/create' component={CreateTodo} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
      </div>
    </Router>
  );
}

export default App;
