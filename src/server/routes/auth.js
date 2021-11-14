import express from 'express';
import axios from 'axios';
import boom from '@hapi/boom';
import passport from 'passport';
const router = express.Router();
import { ENV } from '../config';

require('../utils/auth/strategies/basic');

function auth(app) {

    app.use('/auth', router);

    router.post("/sign-in", async function (req, res, next) {

        passport.authenticate("basic", function (error, data) {
            try {
                if (error || !data) {
                    next(boom.unauthorized("error interno"));
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

    router.post("/sign-up", async function (req, res, next) {
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
            
            if(error.response.data.statusCode >= 400 < 500){
                res.status(201).send({err: error.response.data.message});
            }else{
                next(error);
            }
            
        }
    });

}

export default auth;
