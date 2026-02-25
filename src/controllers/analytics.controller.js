const MoodModel = require("../model/mood.model");
const HabitModel= require("../model/habit.model");



async function getWeeklyAnalytics(req,res){

try{

const userId = req.user._id;


/// --- Last 7 Days --- ///

const weekStart = newDate();
 weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

        // 1️⃣ Get Weekly Moods
    const moods = await MoodModel.find({
      userId,
      createdAt: { $gte: weekStart }
    });

   // 2️⃣ Get Weekly Habit Completions
    const habits = await HabitModel.find({ userId });

    // Map date -> completion count
    const habitCompletionMap = {};

    habits.forEach(habit => {
      habit.completedDates.forEach(date => {
        const d = new Date(date).toISOString().split("T")[0];
        habitCompletionMap[d] = (habitCompletionMap[d] || 0) + 1;
      });
    });

    let totalMood = 0;
    let highHabitMoodTotal = 0;
    let lowHabitMoodTotal = 0;
    let highHabitDays = 0;
    let lowHabitDays = 0;

      moods.forEach(mood => {

      const dateKey = new Date(mood.createdAt).toISOString().split("T")[0];
      const completions = habitCompletionMap[dateKey] || 0;

      totalMood += mood.moodLevel;

      if (completions >= 2) {
        highHabitMoodTotal += mood.moodLevel;
        highHabitDays++;
      } else {
        lowHabitMoodTotal += mood.moodLevel;
        lowHabitDays++;
      }
    });

    const weeklyAverageMood =
      moods.length > 0 ? (totalMood / moods.length).toFixed(1) : 0;

    const highHabitAvg =
      highHabitDays > 0 ? (highHabitMoodTotal / highHabitDays) : 0;

    const lowHabitAvg =
      lowHabitDays > 0 ? (lowHabitMoodTotal / lowHabitDays) : 0;

    let improvementPercentage = 0;

    if (lowHabitAvg > 0) {
      improvementPercentage =
        (((highHabitAvg - lowHabitAvg) / lowHabitAvg) * 100).toFixed(1);
    }

    // Smart Insight Message
    let insightMessage = "Track more data to see deeper insights.";

    if (improvementPercentage > 0) {
      insightMessage = `On days you completed 2+ habits, your mood improved by ${improvementPercentage}%.`;
    } else if (improvementPercentage < 0) {
      insightMessage = `Your mood tends to drop on high activity days. Consider balancing your habits.`;
    }

      res.json({
      weeklyAverageMood,
      totalMoodEntries: moods.length,
      totalHabitTracked: habits.length,
      improvementPercentage,
      insightMessage
    });

}catch(error){

    res.status(500).json({ message: error.message });

}


}




module.exports = {getWeeklyAnalytics}