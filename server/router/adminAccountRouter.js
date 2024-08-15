import express from "express";
import * as controller from "../controller/adminAccountController.js";

const router = express.Router();

router.post("/login", controller.adminLogin);
router.post("/createAdminAccount", controller.createAdminAccount);
router.post("/checkidduple", controller.checkIdDuple);
router.get("/getAdminAccount", controller.getAdminAccount);
router.post("/deleteAdminAccount", controller.deleteAdminAccount);

export default router;