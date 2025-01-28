const goals = require('../models/goal_model');

async function  goal_discard_controller_post  (req,res){
    try {
        const goal_to_discard_id = req.params.goal_id;
        console.log(req.params.goal_id)
        const discardedGoal = await goals.findByIdAndUpdate(goal_to_discard_id,{
            is_discarded : true
        });
        res.status(200).send({
            message: "Goal discarded successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports = goal_discard_controller_post;