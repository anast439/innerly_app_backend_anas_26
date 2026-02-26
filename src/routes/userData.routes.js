const express = require("express");
const router = express.Router();
const  getCompleteUserDataController  = require("../controllers/userData.controller");
const protect  = require("../middleware/auth.middleware");

router.get("/complete", protect, getCompleteUserDataController.getCompleteUserData); 

router.delete("/delete-account", protect, getCompleteUserDataController.deleteAccount);

module.exports = router;



