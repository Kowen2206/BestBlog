let admin = require("firebase-admin");
require('dotenv').config();

let serviceAccount = require("../utils/firebaseConfig/bestblog-3643f-firebase-adminsdk-rzxb1-10fc73a565.json");
serviceAccount.project_id = process.env.PROJECT_ID
serviceAccount.private_key_id = process.env.PRIVATE_KEY_ID
serviceAccount.private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
serviceAccount.client_email = process.env.CLIENT_EMAIL
serviceAccount.client_id = process.env.CLIENT_ID
serviceAccount.auth_provider_x509_cert_url = process.env.AUTH_PROVIDER_CERT_URL
serviceAccount.client_x509_cert_url = process.env.CLIENT_CERT_URL

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://bestblog-3643f.appspot.com"
});
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}
