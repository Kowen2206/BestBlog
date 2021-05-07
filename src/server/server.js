import express from 'express';
import dotenv from 'dotenv';
import React from 'react';
import {renderToString } from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore, compose} from 'redux';
import {StaticRouter} from 'react-router-dom';
import reducer from '../frontend/reducers';
import { renderRoutes} from 'react-router-config';
import serverRoutes from "../frontend/routes/ServerRoutes";
import helmet from 'helmet';
import getManifest from './getManifest';

dotenv.config();

const {ENV, PORT} = process.env;

const app = express();
app.use(express.json());

if(ENV == "development"){

    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config');
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, {publicPath: webpackConfig.output.publicPath, serverSideRender: true}));
    app.use(require("webpack-hot-middleware")(compiler));

    
}else{

    app.use((req, res, next)=>{ if(!req.hashManifest) req.hashManifest = getManifest(); next();});
    app.use(express.static(`${__dirname}/public`));
    app.use(helmet());
    app.use(helmet.permittedCrossDomainPolicies());
    app.disable('x-powered-by');
}


const setResponse = (html, preloadedState, manifest) =>{
    const mainStyles = manifest? manifest['vendors.css'] : 'assets/app.css';
    const mainBuild = manifest? manifest['main.js'] : 'assets/app.js';
    const vendorBuild = manifest? manifest['vendors.js']: 'assets/vendor.js';

    return (`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <link rel="stylesheet" href="${mainStyles}" type="text/css" />
        <title>Portafolio</title>
    </head>
    <body>
        <div id="App">${html}</div>
        <script> 
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace( /</g,'\\u003c')}
        </script>
        <script src="${mainBuild}" type="text/javascript"></script>
        <script src="${vendorBuild}" type="text/javascript"></script>
    </body>
    </html>`);
}

const renderApp = async(req, res) =>{
    let initialState;
    initialState = {
    user: {
      email: [], userName: [], id:[], articles: 0
    },
    articles: []}

    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();

    const isLogged = true;

    const html = renderToString(
        <Provider store = {store}>
            <StaticRouter location={req}>
                {renderRoutes(serverRoutes(isLogged))}
            </StaticRouter>
        </Provider>
);
console.log(html);
if(ENV != "development"){
   res.set("Content-Security-Policy", "default-src 'none'; connect-src 'self'; img-src 'self' * data:; script-src 'self' 'sha256-uz37JN7fzzwaCgAfXj1K62qlEHcmEdxkk7d+99vZc/w=' 'unsafe-eval' 'unsafe-inline' *.ckeditor.com https://cdn.ckeditor.com/ckeditor5/ https://docx-converter.cke-cs.com https://pdf-converter.cke-cs.com; style-src-elem 'self' http: https: *.fonts.google.com http: https: *.fonts.googleapis.com 'unsafe-inline' *.ckeditor.com https://cdn.ckeditor.com/ckeditor5/ https://docx-converter.cke-cs.com https://pdf-converter.cke-cs.com; font-src 'self'  data https://fonts.gstatic.com; form-action 'self';  frame-src");
}

res.send(setResponse(html, preloadedState, req.hashManifest));

}


app.get('*', renderApp);

app.listen(PORT, (err) =>{
    if(err){
        console.log(err)
    }
    console.log(`running on port ${PORT}`)
});

