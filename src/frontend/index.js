import React from 'react'
import ReactDom from "react-dom"
import App from "./routes/App"
import './assets/styles/App.scss'
import {Provider} from "react-redux"
import {createStore, compose, applyMiddleware} from "redux";
import {createBrowserHistory} from "history";
import {Router} from "react-router";
import thunk from 'redux-thunk';
import reducer from "./reducers/index";

const composeEnhancers = compose;
const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));
delete window.__PRELOADED_STATE__;

ReactDom.hydrate(
    <Provider store={store}>
        <Router history={history}>
            <App isLogged={true}/>
        </Router>
    </Provider>
    ,document.getElementById("App")
);