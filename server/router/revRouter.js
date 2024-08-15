import express from 'express';
import * as controller from '../controller/revController.js';

const router = express.Router();
// rev page1
router.post('/get/rooms', controller.getAvailableRooms);
// rev card/page2
router.post('/get/roominfo', controller.getRoomInfo);
router.post('/get/roomdetailsinfo', controller.getRoomDetailsInfo);
// rev page2
router.post('/put/revinfos', controller.putRevInfos);
// rev check
router.post('/confirm/rev', controller.confirmRev);
router.post('/confirm/byemail', controller.confirmByEmail);
// rev detailcomp
router.post('/get/revinfos', controller.getRevInfos);
// admin detailconp
router.post('/update/revstate', controller.updateRevState);
router.post('/delete/rev', controller.deleteRev);
router.post('/get/revinfos/history', controller.getHistoryRevInfos);
// admin checkinout
router.post('/get/checkindata', controller.getCheckinData);
router.post('/get/checkoutdata', controller.getCheckoutData);
router.post('/get/presentdata', controller.getPresentData);
router.post('/move/enddata', controller.moveEndData);



export default router;
