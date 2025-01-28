const router = require('express').Router();
const goal_details_controller_get = require('../controller/api/goal_details_controller_get');
router.get("/goal/details/:goal_id",goal_details_controller_get);

module.exports = router;