import express from "express";
import * as controller from "../controller/galleryController.js";

const router = express.Router();

router.post("/galleryList", controller.galleryList);
router.post("/new", controller.galleryUpload)
router.post("/deleteImg", controller.galleryDelete);

export default router;