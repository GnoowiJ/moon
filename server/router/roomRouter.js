import express from "express";
import * as controller from "../controller/roomController.js";

const router = express.Router();

router.get("/popday", controller.getpopdays);

router.get("/:rid", controller.getroomdetail);

router.get("/price/:rid", controller.getroomprice);



export default router;