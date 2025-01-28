const goals = require('../models/goal_model');

 async function  goal_list_controller_get  (req,res){
     try {
        const goals_list = await goals.find();
        res.status(200).send(goals_list);
     } catch (error) {
      res.status(500).send({error: error.message})
     }
}

module.exports = goal_list_controller_get;