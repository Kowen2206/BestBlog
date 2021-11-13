import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { StaticRouter } from 'react-router-dom';
import reducer from '../frontend/reducers';
import { renderRoutes } from 'react-router-config';
import serverRoutes from "../frontend/routes/ServerRoutes";
import getManifest from './getManifest';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import DBImages from './routes/DBImages';
import articles from './routes/articles';
import user from './routes/user';
import auth from './routes/auth';
import config from './config';

let initialState;

const { ENV, PORT } = config;

const app = express();
app.use(express.json());

const corsOptions = { origin:"https://the-bestblog.herokuapp.com"};

if (ENV == "development") {

    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config');
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, { publicPath: webpackConfig.output.publicPath, serverSideRender: true }));
    app.use(require("webpack-hot-middleware")(compiler));
    app.use(cookieParser());

} else {
    app.use((req, res, next) => { if (!req.hashManifest) req.hashManifest = getManifest(); next(); });
    app.use(express.static(`${__dirname}/public`));
    app.use(cookieParser());
    app.use(cors(corsOptions));
}

const renderApp = async (req, res, next) => {

    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();

    const isLogged = initialState.user.session;
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes(isLogged))}
            </StaticRouter>
        </Provider>
    );
    res.send(setResponse(html, preloadedState, req.hashManifest));
}

const setInitialState = async (req, res, next)=> {

    initialState;
    let { email, name, id, token, photo } = req.cookies;
    let articles;

    token ? token = token : token = process.env.API_KEY_TOKEN;

    try {
        let ArticlesList = await axios(
            {
                url: `${process.env.API_URL}/api/article`,
                headers: { Autorization: `Bearer${token}` },
                method: "get",
                data:{UserId: id}
            });

        ArticlesList = ArticlesList.data.data;

        initialState = {
            user: {
                session: id ? true : false, email, name, id, photo, articles: articles ? ArticlesList : 0
            },
            articles: ArticlesList,
            articleView: [],
            Message: {message: "", title: ""}
        }

    } catch (error) {
        console.log(error + "INITIAL_STATE_ERROR_CATCH")
        initialState = {
            user: {
                session: false,
                email: [], name: [], id: [], photo: [], articles: []
            },
            articles: [],
            articleView: [],
            Message: {message: "Parece que hay un error en el servidor, intenta conectarte más tarde", title: "Error de servidor"} 
        }
    }

    next();

}

const setResponse = (html, preloadedState, manifest) => {
    const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
    const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
    const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

    return (`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <link rel="icon" href="data:,">
        <link rel="stylesheet" href="${mainStyles}" type="text/css" />
        <title>BESTBLOG</title>
    </head>
    <body>
        <div id="App">${html}</div>
        <script> 
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="${mainBuild}" type="text/javascript"></script>
        <script src="${vendorBuild}" type="text/javascript"></script>
    </body>
    </html>`);
}

app.get('*', setInitialState ,renderApp);

auth(app);
user(app);
DBImages(app);
articles(app);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`running on port ${PORT}`)
});