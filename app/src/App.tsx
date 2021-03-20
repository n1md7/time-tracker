import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Authentication from './pages/Authentication';
import Main from './pages/Main';
import Registration from './pages/Registration';
import UserSignOut from './components/UserSignOut';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Teams from './pages/Teams';
import Projects from './pages/projects/Projects';
import './styles/App.scss';

function App() {

    return (
        <Switch>
            <Route path="/sign-in" component={Authentication}/>
            <Route path="/sign-up" component={Registration}/>
            <Route path="/sign-out" component={UserSignOut}/>
            <ProtectedRoute path="/" exact component={Main}/>
            <ProtectedRoute path="/settings" component={Settings}/>
            <ProtectedRoute path="/profile" component={Profile}/>
            <ProtectedRoute path="/members" component={Members}/>
            <ProtectedRoute path="/teams" component={Teams}/>
            <ProtectedRoute path="/projects" component={Projects}/>
            <Redirect to="/"/>
        </Switch>
    );
}

export default App;
