import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import TodosList from './components/TodosList';
import EditTodo from './components/EditTodo';
import CreateTodo from './components/CreateTodo';
import Signup from './components/Signup';
import Signin from './components/Signin';
import NavBar from './components/NavBar';
import Settings from './components/Settings';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <br />
        <PrivateRoute exact path='/' component={TodosList} />
        <PrivateRoute exact path='/edit/:id' component={EditTodo} />
        <PrivateRoute exact path='/create' component={CreateTodo} />
        <PrivateRoute exact path='/settings' component={Settings} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/forgot-password' component={ForgotPassword} />
        <Route exact path='/reset-password/:resetPasswordToken' component={ResetPassword} />
      </div>
    </Router>
  );
}

export default App;
