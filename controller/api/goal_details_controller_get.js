const goals = require('../../models/goal_model');

async function  goal_details_controller_get  (req,res){
    try {
        const goal = await goals.findById(req.params.goal_id).lean();
        res.status(200).send(goal);
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

module.exports = goal_details_controller_get;