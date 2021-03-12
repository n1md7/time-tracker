import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import useSocket from "./hooks/useSocket";

function App() {
  const [socket, connected, socketError] = useSocket();
  useEffect(() => {
    if(connected){
      console.log('Socket.io connected!');
    }
  }, [connected]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
