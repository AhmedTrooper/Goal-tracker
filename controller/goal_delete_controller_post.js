const goals = require('../models/goal_model');

async function  goal_delete_controller_post  (req,res){
    try {
      const goal_to_delete_id = req.params.goal_id;
        console.log(req.params.goal_id)
       await goals.findByIdAndDelete(goal_to_delete_id);
      res.status(200).send({
        message: "Goal deleted successfully",
      });
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

module.exports = goal_delete_controller_post;