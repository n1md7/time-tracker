import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Authentication from './pages/Authentication';
import Main from './pages/Main';
import Registration from './pages/Registration';
import UserSignOut from './components/UserSignOut';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import './styles/App.scss';

function App() {

    return (
        <Switch>
            <Route path="/sign-in" component={Authentication}/>
            <Route path="/sign-up" component={Registration}/>
            <Route path="/sign-out" component={UserSignOut}/>
            <ProtectedRoute path="/" exact component={Main}/>
            <ProtectedRoute path="/settings" exact component={Settings}/>
            <ProtectedRoute path="/profile" exact component={Profile}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default App;
