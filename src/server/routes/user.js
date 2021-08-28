import express from 'express';
import axios from 'axios';

const router = express.Router();

function user(app) {

    app.use('/user', router);

    //obtiene los datos de un usuario mediante su id
    router.post('/', (req, res, next) => {
        const { id } = req.body;
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(req.cookies);
        console.log(id)
        axios.get(`${process.env.API_URL}/api/user/${id}`)
            .then(article => {
                res.status(200).send(JSON.stringify(article.data))
            })
            .catch(err => { console.log("errServer"); console.log(err); res.send(err); });
    });

    router.post('/update',  async (req, res, next) =>{
        const { id, name, password, photo, newPassword } = req.body;
        try{
           await axios.put(`${process.env.API_URL}/api/user/${id}`, { name, password, photo, newPassword });
            res.status(201).json({
            message: "user upadated"
            });
        }
        catch(error) {
            if(error.response.data.statusCode >= 400 < 500){
                console.log(error.response.data.message)
                res.status(201).send({err: error.response.data.message});
            }else{
                next(error);
            }
            
        }
        
    });
}

export default user;