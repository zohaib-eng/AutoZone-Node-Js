const userController  = require('../controllers/user.controller');
const userValidation = require("../middlewares/validate.middleware");
const auth = require("../middlewares/token.middleware");

const express = require('express');
const router = express.Router();


router.post("/add", userValidation, userController.create);
router.get("/data/:email", userController.getUser)
router.get("/all/", userController.getAllUser);
router.delete("/delete/", userController.delete);
router.patch("/update/", userController.update);
router.get("/login/", userController.login);
router.put("/changePassword/", userController.changePassword);
router.put("/otpGenerate/", userController.otpGenerates);
router.put("/forgotPassword/", userController.forgotPassword);
router.patch("/editProfile/", userController.editProfile);

module.exports = router;