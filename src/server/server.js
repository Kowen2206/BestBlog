import express from 'express';
import dotenv from 'dotenv';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { StaticRouter } from 'react-router-dom';
import reducer from '../frontend/reducers';
import { renderRoutes } from 'react-router-config';
import serverRoutes from "../frontend/routes/ServerRoutes";
import helmet, { contentSecurityPolicy } from 'helmet';
import getManifest from './getManifest';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import boom from '@hapi/boom';
import passport from 'passport';
import firebase from './lib/firebase';
import multer from 'multer';

require('./utils/auth/strategies/basic');

const upload = multer({
    storage: multer.memoryStorage()
});

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();
app.use(express.json());

if (ENV == "development") {

    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config');
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, { publicPath: webpackConfig.output.publicPath, serverSideRender: true }));
    app.use(require("webpack-hot-middleware")(compiler));


} else {
    app.use((req, res, next) => { if (!req.hashManifest) req.hashManifest = getManifest(); next(); });
    app.use(express.static(`${__dirname}/public`));
    app.use(cookieParser());
  //  app.use(helmet({contentSecurityPolicy: false}));
  //  app.use(helmet.permittedCrossDomainPolicies());
  //  app.disable('x-powered-by');
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
        <link rel="stylesheet" href="${mainStyles}" type="text/css" />
        <title>Portafolio</title>
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

const renderApp = async (req, res, next) => {
    let initialState;
    let { email, name, id, token, photo } = req.cookies;
    console.log("req.cookies")
    console.log(req.cookies)
    console.log(email)
    let articles;

    token ? token = token : token = process.env.API_KEY_TOKEN;

    try {
        let ArticlesList = await axios(
            {
                url: `${process.env.API_URL}/api/article`,
                headers: { Autorization: `Bearer${token}` },
                method: "get"
            });

        ArticlesList = ArticlesList.data.data;

        initialState = {
            user: {
                session: id ? true : false, email, name, id, photo, articles: articles ? ArticlesList : 0
            },
            articles: ArticlesList,
            articleView: [],

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
        }
    }

    console.log(ENV != "development" ? req._parsedOriginalUrl.pathname : req.url)

    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();

    const isLogged = initialState.user.session;
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={ENV != "development" ? req._parsedOriginalUrl.pathname : req.url} context={{}}>
                {renderRoutes(serverRoutes(isLogged))}
            </StaticRouter>
        </Provider>
    );
    if (ENV != "development") {
        //res.set("Content-Security-Policy", "default-src 'none' 'sha256-nMxMqdZhkHxz5vAuW/PAoLvECzzsmeAxD/BNwG15HuA='; connect-src 'self'; img-src 'self' * data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.ckeditor.com https://cdn.ckeditor.com/ckeditor5/ https://docx-converter.cke-cs.com https://pdf-converter.cke-cs.com; style-src-elem 'self' http: https: *.fonts.google.com http: https: *.fonts.googleapis.com 'unsafe-inline' *.ckeditor.com https://cdn.ckeditor.com/ckeditor5/ https://docx-converter.cke-cs.com https://pdf-converter.cke-cs.com; font-src 'self'  data https://fonts.gstatic.com; form-action 'self';  frame-src");
    }

    res.send(setResponse(html, preloadedState, req.hashManifest));

}

//if (req._parsedOriginalUrl.pathname != "/favicon.ico") { next() } 
app.get('*', (req, res, next) =>{ if (req._parsedOriginalUrl.pathname != "/favicon.ico") { next() }else{ console.log("req.url");console.log(req.url);}} ,renderApp);

app.post("/auth/sign-in", async function (req, res, next) {


    passport.authenticate("basic", function (error, data) {
        try {
            if (error || !data) {
                next(boom.unauthorized("err data"));
            }

            req.login(data, { session: false }, async function (err) {
                if (err) {
                    next(err);
                }

                const { token, ...user } = data;

                res.cookie("token", token, {
                    httpOnly: !(ENV === 'development'),
                    secure: !(ENV === 'development')
                });

                res.status(200).json(user);
            });
        } catch (err) {
            next(err);
        }
    })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
    console.log(req.body);
    const { body: user } = req;
    const data = { ...user, isAdmin: false }
    try {
        await axios({
            url: `${process.env.API_URL}/api/auth/sign-up`,
            method: "post",
            data: data
        });
        res.status(201).json({ message: "user created" });
    } catch (error) {
        next(error);
    }
});

app.post("/api/articles", async function (req, res, next) {
    console.log("try articles");
    try {
        console.log("try articles");

        const dataArticle = await axios.get(`${process.env.API_URL}/api/article`);
        res.status(200).send(dataArticle.data);
    }
    catch (err) {
        console.log("ERROR ARTICLES" + err)
    }
});

app.post('/api/articles/createArticle', async (req, res, next) => {
    try {
        const ArticleStatus = await axios.post(`${process.env.API_URL}/api/article`, req.body);
        res.status(200).send(ArticleStatus.data);
    }
    catch (err) {
        console.log("ERROR CREATE ARTICLE " + err);
    }
});

app.post('/uploadImage', upload.single('Image'), async (req, res, next) => {
    if (!req.file) {
        res.status(400).send("Error: No files found")
    } else {
        const blob = firebase.bucket.file(req.file.originalname)
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })
        blobWriter.on('error', (err) => {
            console.log(err)
        });

        blobWriter.on('finish', (data) => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            console.log("URL: " + publicUrl)
            res.status(200).send({

                 uploaded: true,
                 url: publicUrl,
                
            });
        })

        blobWriter.end(req.file.buffer)
    }
})

app.post('/uploadCkeditorImage', upload.single('upload'), async (req, res, next) => {
    if (!req.file) {
        res.status(400).send("Error: No files found")
    } else {
        const blob = firebase.bucket.file(req.file.originalname)
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        })
        blobWriter.on('error', (err) => {
            console.log(err)
        });

        blobWriter.on('finish', (data) => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            console.log("URL: " + publicUrl)
            res.status(200).send({

                 uploaded: true,
                 url: publicUrl,
                
        });
    })

        blobWriter.end(req.file.buffer)
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`running on port ${PORT}`)
});