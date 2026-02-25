const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const getWeeklyAnalyticsController = require("../controllers/analytics.controller");

router.get("/weekly", protect, getWeeklyAnalyticsController.getWeeklyAnalytics);

module.exports = router;
