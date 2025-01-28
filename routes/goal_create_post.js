const router = require('express').Router();
const goal_create_controller_post = require('../controller/goal_create_controller_post');
router.post("/create_goal",goal_create_controller_post);

module.exports = router;