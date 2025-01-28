const goals = require('../models/goal_model');

async function  goal_finish_controller_patch  (req, res){
    try {
        const goal_to_finish_id = req.params.goal_id;
         await goals.findByIdAndUpdate(goal_to_finish_id,{
            is_finished : true
        });
        res.status(200).send({
            message: "Goal Finished successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports = goal_finish_controller_patch;