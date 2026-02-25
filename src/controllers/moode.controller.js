const Mood = require("../model/mood.model");



/// --- Add Mood --- ///

async function addMood(req,res){


try{

const {moodLevel,stressLevel,note}=req.body;


const mood = await Mood.create({
    userId:req.user._id,
    moodLevel,
    stressLevel,
    note
});


    res.status(201).json(mood);



}catch(error){

    res.status(500).json({ message: error.message });

}

}



async function getUserMoods(req,res){
    try{


  const moods = await Mood.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

      res.json(moods);

    }catch(error){


            res.status(500).json({ message: error.message });

    }


}

module.exports ={addMood,getUserMoods}