import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import TodosList from './components/TodosList';
import EditTodo from './components/EditTodo';
import CreateTodo from './components/CreateTodo';
import Signup from './components/Signup';
import Signin from './components/Signin';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
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
