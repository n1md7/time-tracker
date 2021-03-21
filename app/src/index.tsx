import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import ModalConfirm from "./components/ModalConfirm";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
        <ToastContainer limit={5} newestOnTop={true}/>
        <ModalConfirm/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// This is necessary for pre-configured modal closeHandler make work on page refresh
// When modal is open show:true and page refreshes it keeps the state and modal shows up
// However close handlers are not configured that time so without pre-configuration
// it is not possible to close it
// So by exporting this store in reducer its possible to trigger show:false
export {
  store
}
