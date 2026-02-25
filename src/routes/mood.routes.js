const express = require("express");
const router = express.Router();

const moodsController= require("../controllers/moode.controller");
const protect=require("../middleware/auth.middleware");

router.post("/add",protect,moodsController.addMood);

router.get("/all",protect,moodsController.getUserMoods);

module.exports = router; 