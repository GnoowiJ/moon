import express from "express";
import * as controller from "../controller/popupController.js";

const router = express.Router();

router.post("/", controller.popupImg);
router.post("/popupList", controller.popupList)
router.post("/popupdelete", controller.popupDelete)

export default router;