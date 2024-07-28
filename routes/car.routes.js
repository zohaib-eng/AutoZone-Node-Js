const sellCarController  = require('../controllers/sellCar.controller');

const express = require('express');
const fileUpload = require('../middlewares/imageUpload.middleware');
const router = express.Router();


router.post("/sell", sellCarController.sell);
router.patch("/update", sellCarController.update);
router.patch("/image", fileUpload(), sellCarController.upload);
router.get("/search", sellCarController.search);


module.exports = router;