const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const habitsController = require("../controllers/hobit.controller");


router.post("/create",protect,habitsController.createHabit);

router.get("/all",protect,habitsController.getUserHabits);

router.put("/complete/:id",protect,habitsController.completeHabit);

router.delete("/delete/:id",protect,habitsController.deleteHabit); 


module.exports = router;


