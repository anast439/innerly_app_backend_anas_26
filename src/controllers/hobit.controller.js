const HabitModel = require("../model/habit.model");
const userModel = require("../model/user.model");


/// --- Create Habit --- ///

async function createHabit(req,res){

try{

const {title,targetDays} = req.body;

const habit = await HabitModel.create({
    userId:req.user._id,
    title,
    targetDays,
});

res.status(201).json(habit);


}catch(error){


    res.status(500).json({message: error.message});
}


}


/// --- Get All Habits --- ///

async function getUserHabits(req,res){

try{

const habits = await HabitModel.find({userId:req.user._id}).sort({createdAt: -1});

res.json(habits);


}catch(error){

        res.status(500).json({ message: error.message });

}

}


async function completeHabit(req,res){

try{

    const habit = await HabitModel.findById(req.params.id);

    if(!habit){

              return res.status(404).json({ message: "Habit not found" });

    }

        if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }


    const today = new Date();
    today.setHours(0, 0, 0, 0);


        // Check if already completed today
    const alreadyCompleted = habit.completedDates.some(date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });
    if (alreadyCompleted) {
      return res.status(400).json({ message: "Habit already completed today" });
    }

       // STREAK LOGIC
    if (habit.lastCompletedDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const lastDate = new Date(habit.lastCompletedDate);
      lastDate.setHours(0, 0, 0, 0);

      if (lastDate.getTime() === yesterday.getTime()) {
        habit.streakCount += 1;
      } else if (lastDate.getTime() !== today.getTime()) {
        habit.streakCount = 1;
      }
    } else {
      habit.streakCount = 1;
    }

    habit.completedDates.push(today);
    habit.lastCompletedDate = today;

    await habit.save();

    res.json(habit);

}catch(error){

    res.status(500).json({ message: error.message });


}

}

async function deleteHabit  (req, res)  {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await habit.deleteOne();

    res.json({ message: "Habit deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={createHabit,getUserHabits,completeHabit,deleteHabit};
