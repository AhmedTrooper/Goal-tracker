const router = require('express').Router();
const goal_finish_controller_patch = require('../controller/goal_finish_controller_patch');
router.patch("/finish_goal/:goal_id",goal_finish_controller_patch);

module.exports = router;