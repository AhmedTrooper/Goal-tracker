const router = require('express').Router();
const goal_delete_controller_post = require('../controller/goal_delete_controller_post');
router.delete("/delete_goal/:goal_id",goal_delete_controller_post);

module.exports = router;