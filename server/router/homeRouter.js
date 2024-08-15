import express from "express";
import * as controller from '../controller/homeController.js'

const router = express.Router();

router.get("/", controller.homePopup)

export default router;