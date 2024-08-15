import express from "express";
import * as controller from "../controller/guestroomController.js";


const router = express.Router();

router.get("/", controller.roomList)


export default router;
