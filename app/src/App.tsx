import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Authentication from './pages/Authentication';
import Main from './pages/Main';
import Registration from './pages/Registration';
import UserSignOut from './components/UserSignOut';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Members from './pages/Members';
import Teams from './pages/teams/Teams';
import Team from './pages/teams/Team';
import Projects from './pages/projects/Projects';
import {resetModal, updateUserTimeTrackTitle} from './redux/actions';
import {useDispatch} from 'react-redux';
import Notifications from './pages/notification/Notifications';
import useTimeTracker from './hooks/useTimeTracker';
import './styles/App.scss';

function App() {
  const dispatch = useDispatch();
  useTimeTracker();


  useEffect(() => {
    // Reset state on page refresh
    // This is problematic only in Chrome
    // And caused by Redux-dev tool extension
    dispatch(resetModal());
    dispatch(updateUserTimeTrackTitle({title: document.title || 'Time Track'}));
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route path="/sign-in" component={Authentication}/>
      <Route path="/sign-up/:invitationKey?" component={Registration}/>
      <Route path="/sign-out" component={UserSignOut}/>
      <ProtectedRoute path="/" exact component={Main}/>
      <ProtectedRoute path="/settings" component={Settings}/>
      <ProtectedRoute path="/profile" component={Profile}/>
      <ProtectedRoute path="/members" component={Members}/>
      <ProtectedRoute path="/team/:teamId" component={Team}/>
      <ProtectedRoute path="/teams" component={Teams}/>
      <ProtectedRoute path="/projects" component={Projects}/>
      <ProtectedRoute path="/notifications" component={Notifications}/>
      <Redirect to="/"/>
    </Switch>
  );
}

export default App;
