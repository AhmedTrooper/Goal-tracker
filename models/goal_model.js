const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
   goal_name :{
       type: String,
       required: true,
       unique: true
   },
    goal_description :{
        type: String,
        required: true
    },
    goal_end_date :{
        type: Date,
        required: true
    },
    is_finished :{
        type: Boolean,
        required: true,
        default: false
    },
    is_discarded :{
        type: Boolean,
        required: true,
        default: false
    },
    resourcesLink: {
        type: String,

    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Goals', goalSchema);