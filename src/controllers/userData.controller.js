const User = require("../model/user.model");
const Habit = require("../model/habit.model");
const Mood = require("../model/mood.model");

async function getCompleteUserData  (req, res) {
  try {

    const userId = req.user._id;
 
    // Fetch User
    const user = await User.findById(userId).select("-password");

    // Fetch Habits
    const habits = await Habit.find({ userId });

    // Fetch Moods
    const moods = await Mood.find({ userId });

    // Weekly range
    const today = new Date();
    today.setHours(0,0,0,0);

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);

    const weeklyMoods = moods.filter(
      m => new Date(m.createdAt) >= weekStart
    );

    const weeklyHabits = habits.map(h => {
      const completedThisWeek = h.completedDates.filter(
        date => new Date(date) >= weekStart
      );
      return {
        habitId: h._id,
        title: h.title,
        weeklyCompletions: completedThisWeek.length,
        streakCount: h.streakCount
      };
    });

    res.json({
      user,
      habits,
      moods,
      weeklySummary: {
        totalHabits: habits.length,
        totalMoods: moods.length,
        weeklyMoodEntries: weeklyMoods.length,
        weeklyHabits
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getCompleteUserData}
 