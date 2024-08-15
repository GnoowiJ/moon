import express from 'express';
import * as controller from '../controller/uploadController.js';

const router = express.Router()

router.post('/', controller.upload);
router.post('/popup', controller.popupload);


export default router;