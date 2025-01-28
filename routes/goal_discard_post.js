const router = require('express').Router();
const goal_discard_controller_post = require('../controller/goal_discard_controller_post');
router.patch("/discard_goal/:goal_id",goal_discard_controller_post);

module.exports = router;