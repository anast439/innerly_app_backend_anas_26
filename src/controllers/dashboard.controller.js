const UserModel = require("../model/user.model");
const MoodModel=require("../model/mood.model");
const HabitsModel=require("../model/habit.model");


async function getDashboardSummary(req,res) {


try{

const userId = req.user._id;

    // 1️⃣ User Info

const user = await UserModel.findById(userId).select("-password"); 


    // 2️⃣ Today's Mood

    const today = new Date();
    today.setHours(0,0,0,0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayMood= await MoodModel.findOne({userId,


              date: { $gte: today, $lt: tomorrow }

    });


        // 3️⃣ Active Habits
    const activeHabits = await HabitsModel.find({
      userId,
      isActive: true
    });

    const totalHabits = activeHabits.length;

    const totalStreak = activeHabits.reduce(
      (sum, habit) => sum + habit.streakCount,
      0
    ); 

      // 4️⃣ Weekly Mood Average
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const weeklyMoods = await MoodModel.find({
      userId,
      createdAt: { $gte: weekStart }
    });

    let weeklyAverageMood = 0;

    if (weeklyMoods.length > 0) {
      const totalMood = weeklyMoods.reduce(
        (sum, mood) => sum + mood.moodLevel,
        0
      );
      weeklyAverageMood = (totalMood / weeklyMoods.length).toFixed(1);
    }

        res.json({
      user,
      todayMood: todayMood || null,
      totalHabits,
      totalStreak,
      weeklyAverageMood,
    });
}
catch(error){

    res.status(500).json({ message: error.message });


}

    
} 

module.exports={getDashboardSummary}