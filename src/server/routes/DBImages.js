import express from 'express';
import multer from 'multer';
import firebase from '../lib/firebase';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
});


function DBImages(app) {

    app.use('/db', router);
    //sube una imagen a firebase para un preview de ckeditor
    router.post('/uploadCkeditorImage', upload.single('upload'), async (req, res, next) => {
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

    //sube una imagen a firebase y obtiene la url
    router.post('/uploadImage', upload.single('Image'), async (req, res, next) => {
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
}

export default DBImages;