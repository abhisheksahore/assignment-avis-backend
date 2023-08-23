import express from "express";
import fs from "fs";
import { mergeImageController } from "../controller/uploadImageController.js";
import path from "path";

const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        mergeImageController(res, req.files, next);
    } catch (error) {
        console.log("running", error);
    }
});

export default router;