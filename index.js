import express from 'express';
import bodyParser from "body-parser";
import uploadImageRoute from './routes/uploadImage.js';
import multer from 'multer';
import cors from 'cors';
import { removeFile } from './middlewares/removeFile.js';
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})

const mul = multer({storage: storage});
app.use('/upload',  mul.any('images') ,uploadImageRoute, removeFile)



app.listen(3002, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server is running...");
    }
})