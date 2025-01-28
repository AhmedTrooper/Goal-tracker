const router = require('express').Router();
const goal_list_controller_get = require('../controller/goal_list_controller_get');
router.get("/",goal_list_controller_get);

module.exports = router;