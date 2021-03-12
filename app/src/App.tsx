import React, {useEffect} from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';


export default function App() {

  return (
    <Switch>
        <Route path="/main">
            {"main"}
        </Route>
        <Route path="/auth">
            {"auth page"}
        </Route>
        <Redirect to="/auth"/>
    </Switch>
  );
}
