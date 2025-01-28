const goals = require('../models/goal_model');

async function  goal_create_controller_post  (req,res){
    try {
        const newGoal = {
            goal_name : req.body.goal_name,
            goal_description : req.body.goal_description,
            goal_end_date : req.body.goal_end_date,

        }

        console.log(req.body)
        await goals.create(newGoal);
        const created_goal = await goals.findOne({goal_name: req.body.goal_name});
        res.status(200).send(created_goal);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports = goal_create_controller_post;