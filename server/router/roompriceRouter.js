import express from "express";
import * as controller from "../controller/roompriceController.js";

const router = express.Router();

// 가격 업로드 API
router.post("/price", controller.upload);

// 방 목록 조회 API
router.get("/rooms", controller.getRooms);

// 성수기 기간 조회 API
router.get("/peakseason", controller.getSeason);

// 성수기 기간 추가 API
router.post("/peakseasons", controller.uploadSeason);

// 성수기 기간 삭제 API
router.delete("/peakseason/:pop_id", controller.deleteSeason);

export default router;
