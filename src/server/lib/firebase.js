var admin = require("firebase-admin");

var serviceAccount = require("../utils/firebaseConfig/bestblog-3643f-firebase-adminsdk-rzxb1-10fc73a565.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://bestblog-3643f.appspot.com"
});
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}

