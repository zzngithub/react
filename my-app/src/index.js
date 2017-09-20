import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/*创建store*/
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import portalApp from './reducers/index';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//store
let store = createStore(portalApp);
console.log(store);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();


