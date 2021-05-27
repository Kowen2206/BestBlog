const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const axios = require("axios");
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    console.log(password + email + "user data, step: basic")
    console.log(`${process.env.API_URL}/api/auth/sign-in`)
    console.log(`${process.env.API_KEY_TOKEN}`)
    //http://localhost:3001/api/auth/sign-in
    try {
      const { data, status } = await axios({
        url: `${process.env.API_URL}/api/auth/sign-in`,
        method: "post",
        auth: {
          password,
          username: email
        },
        data: {
          apiKeyToken: process.env.API_KEY_TOKEN
        }
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data);
    } catch (error) {
        console.log(password + email + "user data, step: basic/Error")
      return cb(error);
    }
  })
);
