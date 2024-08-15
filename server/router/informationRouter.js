import express from "express";
import * as controller from "../controller/inforamtionController.js";


const router = express.Router();
router.post("/", controller.infoPrice)

export default router;