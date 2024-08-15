import express from "express";
import * as controller from "../controller/reservationController.js";

const router = express.Router();

router.post("/revList", controller.getRevList);
router.get("/revStatistics", controller.getStatistics);

export default router;