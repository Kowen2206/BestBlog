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
import cors from 'cors';

require('./utils/auth/strategies/basic');
const upload = multer({
    storage: multer.memoryStorage()
});

dotenv.config();

const { ENV, PORT } = process.env;

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

const renderApp = async (req, res, next) => {
    let initialState;
    console.log("req");
    console.log(req.cookies)
    let { email, name, id, token, photo } = req.cookies;
    let articles;

    token ? token = token : token = process.env.API_KEY_TOKEN;

    console.log("pinshiToken");

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
            Error: [false, "Error"]

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
            Error: [true, "Parece que hay un error en el servidor, intenta conectarte más tarde"]
        }
    }


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
    if (ENV != "development") {
        //res.set("Content-Security-Policy", "default-src 'none' 'sha256-nMxMqdZhkHxz5vAuW/PAoLvECzzsmeAxD/BNwG15HuA='; connect-src 'self'; img-src 'self' * data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.ckeditor.com https://cdn.ckeditor.com/ckeditor5/ https://docx-converter.cke-cs.com https://pdf-converter.cke-cs.com; style-src-elem 'self' http: https: *.fonts.google.com http: https: *.fonts.googleapis.com 'unsafe-inline' *.ckeditor.com https://cdn.ckeditor.com/ckeditor5/ https://docx-converter.cke-cs.com https://pdf-converter.cke-cs.com; font-src 'self'  data https://fonts.gstatic.com; form-action 'self';  frame-src");
    }

    res.send(setResponse(html, preloadedState, req.hashManifest));

}

app.get('*', renderApp);

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

//obtiene un articulo mediante su id
app.post('/api/article', (req, res, next) => {
    const { payload } = req.body;
    axios.get(`${process.env.API_URL}/api/article/${payload}`)
        .then(article => res.status(200).send(JSON.stringify(article.data.data)))
        .catch(err => { console.log("errServer"); console.log(err); res.send(err); });
});

//consigue todos los articulos de la api
app.post("/api/articles", async function (req, res, next) {
    try {
        const dataArticle = await axios.get(`${process.env.API_URL}/api/article`);
        res.status(200).send(dataArticle.data);
    }
    catch (err) {
        console.log("ERROR ARTICLES")
        console.log(err)
    }
});

//consigue todos los articulos de un usuario mediante su id (bueno, creo que era mediante el id)
app.post("/api/articles-user", async function (req, res, next){
    try {
        const {tags} = req.body;
        const dataArticle = await axios.get(`${process.env.API_URL}/api/article/?tags=${tags}`);
        res.status(200).send(dataArticle.data);
    }
    catch (err) {
        console.log("ERROR ARTICLES" + err)
    }
});

//elimina un articulo de manera definitiva de mongo
app.post('/api/deleteArticle', async function (req, res, next) {
    axios.delete(`${process.env.API_URL}/api/article/${req.body.idArticle}`).then(response => res.status(200).send(response.data)).catch(res => console.log(res));
})

//inserta un articulo a mongo
app.post('/api/articles/createArticle', async (req, res, next) => {
    try {
        const ArticleStatus = await axios.post(`${process.env.API_URL}/api/article`, req.body);
        res.status(200).send(ArticleStatus.data);
    }
    catch (err) {
        console.log("ERROR CREATE ARTICLE ");
        console.log(err.request);
        res.status(500).send(err);
    }
});

//sube una imagen a firebase y obtiene la url
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
});

//sube una imagen a firebase para un preview de ckeditor
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
});

//obtiene los datos de un usuario mediante su id
app.post('/api/user', (req, res, next) => {
    console.log("getUser")
    const { id } = req.body;
    console.log(id)
    axios.get(`${process.env.API_URL}/api/user/${id}`)
        .then(article => res.status(200).send(JSON.stringify(article.data)))
        .catch(err => { console.log("errServer"); console.log(err); res.send(err); });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`running on port ${PORT}`)
});