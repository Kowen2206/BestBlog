import express from 'express';
import axios from 'axios';
const router = express.Router();


function articles(app) {

    app.use('/article', router);
    //inserta un articulo a mongo
    router.post('/create', async (req, res, next) => {
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

    //elimina un articulo de manera definitiva de mongo
    router.post('/delete', async function (req, res, next) {
        axios.delete(`${process.env.API_URL}/api/article/${req.body.idArticle}`)
            .then(response => res.status(200).send(response.data))
            .catch(res => console.log(res));
    })

    //Actualiza un article en mongo
    router.post('/update', async function (req, res, next) {
        try {
            console.log(req.body)
            const { id, payload } = req.body;
            const ArticleStatus = await axios.put(`${process.env.API_URL}/api/article/${id}`, payload);
            res.status(200).send(ArticleStatus.data);
        }
        catch (err) {
            console.log("ERROR UPDATE ARTICLE ");
            console.log(err);
            res.status(500).send(err);
            next(err)
        }
    });

    //consigue todos los articulos de un usuario mediante su id (bueno, creo que era mediante el id)
    router.post("/get-user-articles", async function (req, res, next) {
        try {
            const { tags } = req.body;
            const dataArticle = await axios.get(`${process.env.API_URL}/api/article/?tags=${tags}`);
            res.status(200).send(dataArticle.data);
        }
        catch (err) {
            console.log("ERROR ARTICLES" + err)
        }
    });

    //obtiene un articulo mediante el id del articulo
    router.post('/get-one', (req, res, next) => {
        const { payload } = req.body;
        axios.get(`${process.env.API_URL}/api/article/${payload}`)
            .then(article => res.status(200).send(JSON.stringify(article.data.data)))
            .catch(err => { console.log("errServer"); console.log(err); res.send(err); });
    });

    //consigue todos los articulos de la api
    router.post("/get-all", async function (req, res, next) {
        try {
            const dataArticle = await axios.get(`${process.env.API_URL}/api/article`);
            res.status(200).send(dataArticle.data);
        }
        catch (err) {
            console.log("ERROR ARTICLES")
            console.log(err)
        }
    });

}

export default articles;